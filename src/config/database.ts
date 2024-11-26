import 'dotenv/config';
import { Sequelize } from 'sequelize';

export const db = new Sequelize(process.env!.DATABASE_URL as string, {
  logging: () => process.env.NODE_ENV === 'development' ? true : false,
  dialect: 'postgres',
});

async function testConnection() {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.', process.env!.DATABASE_URL);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();
