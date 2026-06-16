import dotenv from 'dotenv';
import prisma from '../config/prisma.js';
import { upsertAdminAccount } from '../services/authService.js';

dotenv.config();

const defaultAdmin = {
  name: 'Admin',
  email: 'admin@toko.com',
  password: 'password123'
};

const run = async () => {
  try {
    const user = await upsertAdminAccount(defaultAdmin);
    console.log('Admin account is ready:', {
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Failed to seed admin account:', error.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

run();
