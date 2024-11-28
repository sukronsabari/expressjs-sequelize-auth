import { betterAuth } from 'better-auth';
import { openAPI } from 'better-auth/plugins';
import dotenv from 'dotenv';
import { PostgresDialect } from 'kysely';
import pg from 'pg';

dotenv.config();

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export const auth = betterAuth({
  database: {
    dialect,
  },
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: 'users',
    fields: {
      emailVerified: 'email_verified',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    additionalFields: {
      deletedAt: {
        type: 'date',
        fieldName: 'deleted_at',
        input: false,
        required: false,
        defaultValue: null,
      },
    },
  },
  session: {
    modelName: 'user_sessions',
    fields: {
      userId: 'user_id',
      expiresAt: 'expires_at',
      ipAddress: 'ip_address',
      userAgent: 'user_agent',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    additionalFields: {
      deletedAt: {
        type: 'date',
        fieldName: 'deleted_at',
        input: false,
        required: false,
        defaultValue: null,
      },
    },
  },
  account: {
    modelName: 'accounts',
    fields: {
      userId: 'user_id',
      accountId: 'account_id',
      providerId: 'provider_id',
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      accessTokenExpiresAt: 'access_token_expires_at',
      refreshTokenExpiresAt: 'refresh_token_expires_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    additionalFields: {
      deletedAt: {
        type: 'date',
        fieldName: 'deleted_at',
        input: false,
        required: false,
        defaultValue: null,
      },
    },
  },
  verification: {
    modelName: 'verifications',
    fields: {
      expiresAt: 'expires_at',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    additionalFields: {
      deletedAt: {
        type: 'date',
        fieldName: 'deleted_at',
        input: false,
        required: false,
        defaultValue: null,
      },
    },
  },
});
