/**
 * MathSpark Database Layer — Prisma + Supabase PostgreSQL
 * Drop-in replacement for the previous in-memory Map store.
 * All function names and signatures are identical to the original.
 */
import { PrismaClient } from '@prisma/client';

// Singleton pattern — prevents creating multiple connections in dev (hot-reload)
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const db = {
  students: {
    /** Find a student by their normalised phone number (0XXXXXXXXX) */
    findByPhone: async (phone) => {
      return prisma.student.findUnique({ where: { phone } });
    },

    /** Find a student by their UUID */
    findById: async (id) => {
      return prisma.student.findUnique({ where: { id } });
    },

    /** Create a new student record */
    create: async (data) => {
      return prisma.student.create({
        data: {
          name:            data.name,
          phone:           data.phone,
          passwordHash:    data.passwordHash,
          grade:           data.grade,
          medium:          data.medium   || 'sinhala',
          role:            data.role     || 'student',
          enrolledCourses: data.enrolledCourses
            ? JSON.stringify(data.enrolledCourses)
            : '[]',
        },
      });
    },

    /** Returns true if a student with this phone already exists */
    exists: async (phone) => {
      const count = await prisma.student.count({ where: { phone } });
      return count > 0;
    },

    /** Return all students */
    all: async () => {
      return prisma.student.findMany({ orderBy: { createdAt: 'desc' } });
    },
  },

  tracking: {
    /** Get a tracking record by its ID (e.g. "MSP-9842") */
    get: async (id) => {
      return prisma.tracking.findUnique({ where: { id } });
    },

    /** Find tracking by phone number (normalised) */
    findByPhone: async (phone) => {
      const normalised = phone.replace(/\s/g, '');
      return prisma.tracking.findFirst({
        where: { phone: { contains: normalised } },
      });
    },

    /** Create or update a tracking record */
    set: async (id, record) => {
      return prisma.tracking.upsert({
        where:  { id },
        update: {
          student: record.student,
          phone:   record.phone,
          item:    record.item,
          status:  record.status,
          courier: record.courier,
        },
        create: {
          id,
          student: record.student,
          phone:   record.phone,
          item:    record.item,
          status:  record.status,
          courier: record.courier,
        },
      });
    },
  },
};
