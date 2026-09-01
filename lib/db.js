/**
 * MathSpark Database Layer — Prisma + Supabase PostgreSQL
 * Drop-in replacement for the previous in-memory Map store.
 * All function names and signatures are identical to the original.
 *
 * PrismaClient is instantiated LAZILY (only on first use) so that
 * Next.js build-time static analysis never tries to open a DB connection.
 *
 * PERFORMANCE NOTES:
 * - globalThis singleton is stored in ALL environments (not just dev) so that
 *   warm serverless invocations reuse the existing Prisma connection instead
 *   of opening a new one on every request (fixes cold-start overhead).
 * - DATABASE_URL must use the pgBouncer pooled endpoint (port 6543) with
 *   ?pgbouncer=true so Supabase transaction-mode pooling is active.
 */

let _prisma = null;

function getPrisma() {
  if (_prisma) return _prisma;

  // Inline require avoids top-level instantiation during build
  const { PrismaClient } = require('@prisma/client');

  // Singleton — reuse across warm invocations in ALL environments
  // (previously only stored in globalThis for dev; production was creating a
  // new PrismaClient on every cold invocation — now fixed)
  if (globalThis.__prisma) {
    _prisma = globalThis.__prisma;
  } else {
    _prisma = new PrismaClient();
    globalThis.__prisma = _prisma; // ← store in prod too
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
          phoneVerified:   data.phoneVerified ?? true,
          enrolledCourses: data.enrolledCourses
            ? (typeof data.enrolledCourses === 'string' ? data.enrolledCourses : JSON.stringify(data.enrolledCourses))
            : '[]',
        },
      });
    },

    /** Update student password */
    updatePassword: async (id, passwordHash) => {
      return getPrisma().student.update({
        where: { id },
        data: { passwordHash }
      });
    },

    /** Returns true if a student with this phone already exists */
    exists: async (phone) => {
      const count = await getPrisma().student.count({ where: { phone } });
      return count > 0;
    },

    /** Return all students with their gradeAccess relation */
    allWithGrades: async () => {
      return getPrisma().student.findMany({
        include: { gradeAccess: true },
        orderBy: { createdAt: 'desc' }
      });
    },

    /** Find student by ID including valid unexpired gradeAccess */
    findByIdWithGrades: async (id) => {
      const student = await getPrisma().student.findUnique({
        where: { id },
        include: { gradeAccess: true }
      });
      if (!student) return null;
      const now = new Date();
      // Filter out any gradeAccess records whose expiresAt date has passed
      student.gradeAccess = (student.gradeAccess || []).filter(g => !g.expiresAt || new Date(g.expiresAt) > now);
      return student;
    },

    /** Check if student has access to a specific grade+month combination.
     * Returns true if:
     *  - student has a null-month record for that grade (legacy all-months access)
     *  - OR student has a matching gradeId+month record (normalizing 'August' vs '2026-08')
     */
    hasGradeMonthAccess: (gradeAccessRecords, gradeId, contentMonth) => {
      const gId = Number(gradeId);
      const MONTH_NAMES = ['january','february','march','april','may','june','july','august','september','october','november','december'];
      const monthsMatch = (a, b) => {
        if (!a || !b) return false;
        const normalize = (m) => {
          const s = String(m).toLowerCase().trim();
          const ym = s.match(/^\d{4}-(\d{2})$/);
          if (ym) return parseInt(ym[1], 10);
          const idx = MONTH_NAMES.findIndex(mn => s.startsWith(mn.slice(0,3)));
          if (idx >= 0) return idx + 1;
          const n = parseInt(s, 10);
          if (!isNaN(n)) return n;
          return s;
        };
        return normalize(a) === normalize(b);
      };

      return (gradeAccessRecords || []).some(g => {
        if (Number(g.gradeId) !== gId) return false;
        // null month on access record = all-months access (legacy grandfathered)
        if (g.month === null || g.month === undefined || g.month === '') return true;
        // null/undefined month on content = accessible to anyone with grade access
        if (!contentMonth) return true;
        return monthsMatch(g.month, contentMonth);
      });
    },

    /** Get all approved access records for a student (excluding expired) — returns [{id, gradeId, month}] */
    getApprovedAccess: async (studentId) => {
      const now = new Date();
      const records = await getPrisma().studentGradeAccess.findMany({
        where: {
          studentId,
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: now } }
          ]
        },
        select: { id: true, gradeId: true, month: true }
      });
      return records;
    },

    /** Legacy: get approved grade IDs only (used by old code) */
    getApprovedGrades: async (studentId) => {
      const records = await db.students.getApprovedAccess(studentId);
      return records.map(r => r.gradeId);
    },

    /** Add a single grade+month access grant for a student */
    addGradeMonthAccess: async (studentId, gradeId, month, expiresAt) => {
      const prisma = getPrisma();
      const numGradeId = Number(gradeId);
      const monthVal = month || null;

      // Find existing grant record
      const existing = await prisma.studentGradeAccess.findFirst({
        where: {
          studentId,
          gradeId: numGradeId,
          month: monthVal,
        }
      });

      if (existing) {
        return prisma.studentGradeAccess.update({
          where: { id: existing.id },
          data: {
            expiresAt: expiresAt ? new Date(expiresAt) : null,
            grantedAt: new Date(),
          }
        });
      }

      return prisma.studentGradeAccess.create({
        data: {
          studentId,
          gradeId: numGradeId,
          month: monthVal,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
        }
      });
    },

    /** Remove a specific access grant by its record ID */
    removeGradeMonthAccess: async (accessId) => {
      return getPrisma().studentGradeAccess.delete({ where: { id: accessId } });
    },

    /** Replace ALL access grants for a student (legacy full-replace used by old admin UI) */
    setApprovedGrades: async (studentId, gradeItems) => {
      const prisma = getPrisma();
      const formattedItems = (gradeItems || []).map(item => {
        if (typeof item === 'object' && item !== null) {
          return {
            studentId,
            gradeId: Number(item.gradeId),
            month: item.month || null,
            expiresAt: item.expiresAt ? new Date(item.expiresAt) : null
          };
        }
        return {
          studentId,
          gradeId: Number(item),
          month: null,
          expiresAt: null
        };
      });

      return prisma.$transaction([
        prisma.studentGradeAccess.deleteMany({ where: { studentId } }),
        prisma.studentGradeAccess.createMany({ data: formattedItems })
      ]);
    },

    /** Delete all expired StudentGradeAccess records from the database */
    cleanupExpiredGrades: async () => {
      const now = new Date();
      const result = await getPrisma().studentGradeAccess.deleteMany({
        where: {
          expiresAt: {
            not: null,
            lte: now
          }
        }
      });
      return result.count;
    },

    /** Get student overview statistics: total registered + per-grade active access breakdown */
    getStudentStats: async () => {
      const prisma = getPrisma();
      const now = new Date();

      const totalStudents = await prisma.student.count({ where: { role: 'student' } });
      const students = await prisma.student.findMany({
        where: { role: 'student' },
        include: {
          gradeAccess: {
            where: {
              OR: [
                { expiresAt: null },
                { expiresAt: { gt: now } }
              ]
            }
          }
        }
      });

      const gradeBreakdown = { 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0 };

      students.forEach(s => {
        // Only count by approved gradeAccess records (paid access), not registration grade
        const countedGrades = new Set();
        (s.gradeAccess || []).forEach(ga => {
          const gId = Number(ga.gradeId);
          if (gradeBreakdown[gId] !== undefined && !countedGrades.has(gId)) {
            countedGrades.add(gId);
            gradeBreakdown[gId]++;
          }
        });
      });

      return {
        totalStudents,
        gradeBreakdown
      };
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
          title:          data.title,
          grade:          Number(data.grade),
          medium:         data.medium || 'sinhala',
          month:          data.month || null,
          price:          FloatOrInt(data.price),
          badge:          data.badge || null,
          description:    data.description || '',
          imageUrl:       data.imageUrl || null,
          sampleVideoUrl: data.sampleVideoUrl || null,
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
          ...(data.month !== undefined && { month: data.month || null }),
          ...(data.price !== undefined && { price: FloatOrInt(data.price) }),
          ...(data.badge !== undefined && { badge: data.badge }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
          ...(data.sampleVideoUrl !== undefined && { sampleVideoUrl: data.sampleVideoUrl }),
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
          month:    data.month || null,
          liveLink: data.liveLink || null,
        }
      });
    },
    update: async (id, data) => {
      return getPrisma().timetable.update({
        where: { id },
        data: {
          ...(data.day     && { day:     data.day }),
          ...(data.time    && { time:    data.time }),
          ...(data.subject && { subject: data.subject }),
          ...(data.grade !== undefined && { grade: Number(data.grade) }),
          ...(data.month !== undefined && { month: data.month || null }),
          ...(data.liveLink !== undefined && { liveLink: data.liveLink || null }),
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
          month:     data.month || null,
          duration:  Number(data.duration || 60),
          questions: typeof data.questions === 'string' ? data.questions : JSON.stringify(data.questions || []),
        }
      });
    },
    update: async (id, data) => {
      return getPrisma().exam.update({
        where: { id },
        data: {
          ...(data.title    && { title:    data.title }),
          ...(data.grade !== undefined && { grade:    Number(data.grade) }),
          ...(data.month !== undefined && { month:    data.month || null }),
          ...(data.duration !== undefined && { duration: Number(data.duration) }),
          ...(data.questions !== undefined && { questions: typeof data.questions === 'string' ? data.questions : JSON.stringify(data.questions) }),
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
    findById: async (id) => {
      return getPrisma().storeItem.findUnique({ where: { id } });
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
    update: async (id, data) => {
      return getPrisma().storeItem.update({
        where: { id },
        data: {
          ...(data.name        && { name:        data.name }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.price !== undefined && { price:       FloatOrInt(data.price) }),
          ...(data.imageUrl !== undefined && { imageUrl:    data.imageUrl || null }),
          ...(data.stock !== undefined && { stock:       Number(data.stock) }),
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
    update: async (id, data) => {
      return getPrisma().result.update({
        where: { id },
        data: {
          ...(data.studentName && { studentName: data.studentName }),
          ...(data.grade !== undefined && { grade:       Number(data.grade) }),
          ...(data.subject && { subject:     data.subject }),
          ...(data.score !== undefined && { score:       Number(data.score) }),
          ...(data.year !== undefined && { year:        Number(data.year) }),
          ...(data.imageUrl !== undefined && { imageUrl:    data.imageUrl || null }),
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

  grades: {
    all: async () => {
      return getPrisma().grade.findMany({ orderBy: { name: 'asc' } });
    },
    create: async (data) => {
      return getPrisma().grade.create({
        data: {
          name:        data.name,
          description: data.description || null,
        }
      });
    },
    update: async (id, data) => {
      return getPrisma().grade.update({
        where: { id },
        data: {
          ...(data.name        && { name:        data.name }),
          ...(data.description !== undefined && { description: data.description || null }),
        }
      });
    },
    delete: async (id) => {
      return getPrisma().grade.delete({ where: { id } });
    }
  },

  orders: {
    all: async () => {
      return getPrisma().order.findMany({ orderBy: { createdAt: 'desc' } });
    },
    findById: async (id) => {
      return getPrisma().order.findUnique({ where: { id } });
    },
    create: async (data) => {
      return getPrisma().order.create({
        data: {
          studentName: data.studentName,
          phone:       data.phone,
          storeItemId: data.storeItemId || null,
          itemName:    data.itemName,
          quantity:    Number(data.quantity || 1),
          totalPrice:  FloatOrInt(data.totalPrice),
          status:      data.status || 'Pending',
        }
      });
    },
    updateStatus: async (id, status) => {
      return getPrisma().order.update({
        where: { id },
        data: { status }
      });
    },
    delete: async (id) => {
      return getPrisma().order.delete({ where: { id } });
    }
  },

  courseLessons: {
    byCourseId: async (courseId) => {
      return getPrisma().courseLesson.findMany({
        where: { courseId },
        orderBy: { order: 'asc' }
      });
    },
    findById: async (id) => {
      return getPrisma().courseLesson.findUnique({ where: { id } });
    },
    create: async (data) => {
      return getPrisma().courseLesson.create({
        data: {
          courseId:    data.courseId,
          order:       Number(data.order || 0),
          title:       data.title,
          description: data.description || null,
          month:       data.month || null,
          pdfUrl:      data.pdfUrl || null,
          videoUrl:    data.videoUrl || null,
        }
      });
    },
    update: async (id, data) => {
      return getPrisma().courseLesson.update({
        where: { id },
        data: {
          ...(data.order       !== undefined && { order: Number(data.order) }),
          ...(data.title       !== undefined && { title: data.title }),
          ...(data.description !== undefined && { description: data.description || null }),
          ...(data.month       !== undefined && { month: data.month || null }),
          ...(data.pdfUrl      !== undefined && { pdfUrl: data.pdfUrl || null }),
          ...(data.videoUrl    !== undefined && { videoUrl: data.videoUrl || null }),
        }
      });
    },
    delete: async (id) => {
      return getPrisma().courseLesson.delete({ where: { id } });
    }
  }
};


function FloatOrInt(val) {
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
}
