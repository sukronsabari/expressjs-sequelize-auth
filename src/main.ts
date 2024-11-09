import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import i18next from 'i18next';
import * as i18nMiddleware from 'i18next-http-middleware';
import fsBackend from 'i18next-fs-backend';

import { rateLimiter } from './app/middlewares/RateLimiterMiddleware';
import { validationErrorMiddleware } from './app/middlewares/ValidationErrorMiddleware';
import { errorMiddleware } from './app/middlewares/ErrorMiddleware';

import { authRoutes } from './routes/auth';
import { salesPersonRoutes } from './routes/sales-persons';
// import { authMiddleware } from './app/middlewares/AuthMiddleware';

i18next
  .use(fsBackend)
  .use(i18nMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: process.env.TRANSLATION_DIR,
      // loadPath: path.join(process.cwd(), 'src/locales', '{{lng}}', '{{ns}}.json'),
    },
    fallbackLng: 'en',
    preload: ['en', 'id'],
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie'],
    },
  });

const app = express();
const port = 9000;
app.set('trust proxy', true);

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json({ type: 'application/json' }));
app.use(morgan('dev'));
app.use(i18nMiddleware.handle(i18next));
app.use(
  rateLimiter({
    key: (req) => {
      const forwarded = req.headers['x-forwarded-for'] as string;
      return forwarded ? forwarded.split(',')[0] : (req.socket.remoteAddress as string);
    },
    limit: 100,
    windowMs: 15 * 60 * 1000,
    message: 'Too many requests, please try again later',
  })
);

app.get('/', async (req, res): Promise<any> => {
  console.log(__dirname + '/resources/locales/{{lng}}/{{ns}}.json');
  return res.send(req.t('hello'));
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/sales-persons', salesPersonRoutes);
app.use(validationErrorMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
