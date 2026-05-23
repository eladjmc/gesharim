import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gesharim',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SENDER_EMAIL: process.env.SENDER_EMAIL || 'noreply@gesharim.org',
  SENDER_NAME: process.env.SENDER_NAME || 'צוות גשרים לקהילה',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@gesharim.org',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  ADMIN_NAME: process.env.ADMIN_NAME || 'מנהל המערכת',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};
