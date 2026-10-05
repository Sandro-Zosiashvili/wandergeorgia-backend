import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../auth/user.entity';
import { Booking } from '../../booking/booking.entity';

/**
 * Idempotent admin seeder — `npm run seed:admin`.
 * Creates the initial ADMIN from .env (ADMIN_EMAIL / ADMIN_PASSWORD) if one
 * doesn't already exist. The password is hashed with bcrypt (10 salt rounds).
 */
async function run(): Promise<void> {
  dotenv.config();

  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error('✖ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  const dataSource = new DataSource({
    type: 'postgres',
    // Prefer the direct (non-pooled) connection for schema sync / DDL.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [User, Booking],
    synchronize: true, // ensure the tables exist before seeding
  });

  await dataSource.initialize();
  const users = dataSource.getRepository(User);

  try {
    const existing = await users.findOne({ where: { email } });
    if (existing) {
      console.log(`✓ Admin already exists: ${existing.email} (id ${existing.id}). Nothing to do.`);
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = users.create({ email, password: passwordHash, role: 'ADMIN' });
    const saved = await users.save(admin);
    console.log(`✅ Admin created: ${saved.email} (id ${saved.id}, role ${saved.role})`);
  } finally {
    await dataSource.destroy();
  }
}

run().catch((err) => {
  console.error('✖ Seed failed:', err);
  process.exit(1);
});
