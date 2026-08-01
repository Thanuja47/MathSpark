/**
 * MathSpark Database Layer — Prisma + Supabase PostgreSQL
 * Drop-in replacement for the previous in-memory Map store.
 * All function names and signatures are identical to the original.
 *
 * PrismaClient is instantiated LAZILY (only on first use) so that
 * Next.js build-time static analysis never tries to open a DB connection.
 */

let _prisma = null;

function getPrisma() {
  if (_prisma) return _prisma;

  // Inline require avoids top-level instantiation during build
  const { PrismaClient } = require('@prisma/client');

  // Singleton pattern — prevents multiple connections in dev (hot-reload)
  if (globalThis.__prisma) {
    _prisma = globalThis.__prisma;
  } else {
    _prisma = new PrismaClient();
    if (process.env.NODE_ENV !== 'production') {
      globalThis.__prisma = _prisma;
    }
  }

  return _prisma;
}

export const db = {
  students: {
    /** Find a student by their normalised phone number (0XXXXXXXXX) */
    findByPhone: async (phone) => {
      return getPrisma().student.findUnique({ where: { phone } });
    },

    /** Find a student by their UUID */
    findById: async (id) => {
      return getPrisma().student.findUnique({ where: { id } });
    },

    /** Create a new student record */
    create: async (data) => {
      return getPrisma().student.create({
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
      const count = await getPrisma().student.count({ where: { phone } });
      return count > 0;
    },

    /** Return all students */
    all: async () => {
      return getPrisma().student.findMany({ orderBy: { createdAt: 'desc' } });
    },
  },

  tracking: {
    /** Get a tracking record by its ID (e.g. "MSP-9842") */
    get: async (id) => {
      return getPrisma().tracking.findUnique({ where: { id } });
    },

    /** Find tracking by phone number (normalised) */
    findByPhone: async (phone) => {
      const normalised = phone.replace(/\s/g, '');
      return getPrisma().tracking.findFirst({
        where: { phone: { contains: normalised } },
      });
    },

    /** Create or update a tracking record */
    set: async (id, record) => {
      return getPrisma().tracking.upsert({
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
