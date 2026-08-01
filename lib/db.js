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
          grade:           Number(data.grade),
          medium:          data.medium   || 'sinhala',
          role:            data.role     || 'student',
          enrolledCourses: data.enrolledCourses
            ? (typeof data.enrolledCourses === 'string' ? data.enrolledCourses : JSON.stringify(data.enrolledCourses))
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

    /** Update enrolled courses for a student */
    updateEnrollments: async (id, enrolledArray) => {
      return getPrisma().student.update({
        where: { id },
        data: { enrolledCourses: JSON.stringify(enrolledArray) }
      });
    }
  },

  courses: {
    all: async () => {
      return getPrisma().course.findMany({ orderBy: { createdAt: 'desc' } });
    },

    findById: async (id) => {
      return getPrisma().course.findUnique({ where: { id } });
    },

    create: async (data) => {
      return getPrisma().course.create({
        data: {
          title:       data.title,
          grade:       Number(data.grade),
          medium:      data.medium || 'sinhala',
          price:       FloatOrInt(data.price),
          badge:       data.badge || null,
          description: data.description || '',
          imageUrl:    data.imageUrl || null,
        }
      });
    },

    update: async (id, data) => {
      return getPrisma().course.update({
        where: { id },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.grade !== undefined && { grade: Number(data.grade) }),
          ...(data.medium && { medium: data.medium }),
          ...(data.price !== undefined && { price: FloatOrInt(data.price) }),
          ...(data.badge !== undefined && { badge: data.badge }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        }
      });
    },

    delete: async (id) => {
      return getPrisma().course.delete({ where: { id } });
    }
  },

  timetable: {
    all: async () => {
      return getPrisma().timetable.findMany({ orderBy: { createdAt: 'desc' } });
    },
    create: async (data) => {
      return getPrisma().timetable.create({
        data: {
          day:      data.day,
          time:     data.time,
          subject:  data.subject,
          grade:    Number(data.grade),
          liveLink: data.liveLink || null,
        }
      });
    },
    delete: async (id) => {
      return getPrisma().timetable.delete({ where: { id } });
    }
  },

  exams: {
    all: async () => {
      return getPrisma().exam.findMany({ orderBy: { createdAt: 'desc' } });
    },
    create: async (data) => {
      return getPrisma().exam.create({
        data: {
          title:     data.title,
          grade:     Number(data.grade),
          duration:  Number(data.duration || 60),
          questions: typeof data.questions === 'string' ? data.questions : JSON.stringify(data.questions || []),
        }
      });
    },
    delete: async (id) => {
      return getPrisma().exam.delete({ where: { id } });
    }
  },

  store: {
    all: async () => {
      return getPrisma().storeItem.findMany({ orderBy: { createdAt: 'desc' } });
    },
    create: async (data) => {
      return getPrisma().storeItem.create({
        data: {
          name:        data.name,
          description: data.description || '',
          price:       FloatOrInt(data.price),
          imageUrl:    data.imageUrl || null,
          stock:       Number(data.stock || 100),
        }
      });
    },
    delete: async (id) => {
      return getPrisma().storeItem.delete({ where: { id } });
    }
  },

  results: {
    all: async () => {
      return getPrisma().result.findMany({ orderBy: { createdAt: 'desc' } });
    },
    create: async (data) => {
      return getPrisma().result.create({
        data: {
          studentName: data.studentName,
          grade:       Number(data.grade),
          subject:     data.subject,
          score:       Number(data.score),
          year:        Number(data.year || 2025),
          imageUrl:    data.imageUrl || null,
        }
      });
    },
    delete: async (id) => {
      return getPrisma().result.delete({ where: { id } });
    }
  },

  tracking: {
    /** Get a tracking record by its ID (e.g. "MSP-9842") */
    get: async (id) => {
      return getPrisma().tracking.findUnique({ where: { id } });
    },

    all: async () => {
      return getPrisma().tracking.findMany({ orderBy: { updatedAt: 'desc' } });
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

    delete: async (id) => {
      return getPrisma().tracking.delete({ where: { id } });
    }
  },
};

function FloatOrInt(val) {
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
}
