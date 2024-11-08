import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { limiter } from './app/middlewares/rate-limiter.middleware';

import i18next from 'i18next';
import * as i18nMiddleware from 'i18next-http-middleware';
import fsBackend from 'i18next-fs-backend';
import { ValidationErrorMiddleware } from './app/middlewares/ValidationErrorMiddleware';
import { authRoutes } from './routes/auth';
import { ErrorMiddleware } from './app/middlewares/ErrorMiddleware';

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

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json({ type: 'application/json' }));
app.use(limiter);
app.use(morgan('dev'));
app.use(i18nMiddleware.handle(i18next));

app.get('/', async (req, res): Promise<any> => {
  console.log(__dirname + '/resources/locales/{{lng}}/{{ns}}.json');
  return res.send(req.t('hello'));
});
app.use('/auth', authRoutes);
app.use(ValidationErrorMiddleware);
app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
