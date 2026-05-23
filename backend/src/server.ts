import app from './app';
import { connectDB, env } from './config';
import { seedAdmin } from './services/auth.service';
import { seedEmailTemplates } from './seed/seed';
import { seedMunicipalitiesAndManhadim } from './seed/seedData';
import { verifyConnection } from './services/email.service';

async function start(): Promise<void> {
  await connectDB();

  // Seed initial data
  await seedAdmin(env.ADMIN_EMAIL, env.ADMIN_PASSWORD, env.ADMIN_NAME);
  await seedEmailTemplates();
  await seedMunicipalitiesAndManhadim();

  await verifyConnection();

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
