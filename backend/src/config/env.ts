import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gesharim',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  SENDER_EMAIL: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
  SENDER_NAME: process.env.SENDER_NAME || 'צוות גשרים לקהילה',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@gesharim.org',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  ADMIN_NAME: process.env.ADMIN_NAME || 'מנהל המערכת',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};
