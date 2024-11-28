import { toNodeHandler } from 'better-auth/node';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv, { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import i18next from 'i18next';
import fsBackend from 'i18next-fs-backend';
import * as i18nMiddleware from 'i18next-http-middleware';
import morgan from 'morgan';

import { errorMiddleware } from './app/middlewares/ErrorMiddleware';
import { rateLimiter } from './app/middlewares/RateLimiterMiddleware';
import { validationErrorMiddleware } from './app/middlewares/ValidationErrorMiddleware';
import { auth } from './lib/auth';
import { authRoutes } from './routes/AuthRoutes';

config();

i18next
  .use(fsBackend)
  .use(i18nMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: process.env.TRANSLATION_DIR,
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
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/auth/')) {
    express.json()(req, res, next);
  } else {
    next();
  }
});
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded requests
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

app.all('/api/auth/*name', toNodeHandler(auth));
app.get('/', async (req, res): Promise<any> => {
  const openAPISchema = await auth.api.openAPIGenerator();
  console.log(openAPISchema);

  return res.json(openAPISchema);
});
app.use('/api/v1/auth', authRoutes);
app.use(validationErrorMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
