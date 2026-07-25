/**
 * MathSpark Database Layer
 * Compatible with serverless environments (Vercel, AWS Lambda, Node.js)
 */

// In-memory data store with state preservation across API calls
const studentsMap = new Map();
const trackingMap = new Map();

// Seed initial test student
studentsMap.set('0712345678', {
  id: 'stu_001',
  name: 'Kavindi Perera',
  phone: '0712345678',
  passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY9g2v0O/OC5I.m',
  grade: 10,
  medium: 'sinhala',
  enrolledCourses: ['1', '2'],
  createdAt: new Date().toISOString(),
  isActive: 1
});

// Seed initial tracking records
trackingMap.set('MSP-9842', {
  id: 'MSP-9842',
  student: 'Kavindi Perera',
  phone: '0712345678',
  item: 'Grade 10 Tute Month 05',
  status: 'In Transit',
  courier: 'Pronto Lanka',
  updatedAt: new Date().toISOString()
});

trackingMap.set('MSP-9841', {
  id: 'MSP-9841',
  student: 'Tharindu Silva',
  phone: '0779876543',
  item: 'Grade 11 Past Paper Pack',
  status: 'Delivered',
  courier: 'Domex',
  updatedAt: new Date().toISOString()
});

export const db = {
  students: {
    findByPhone: async (phone) => {
      return studentsMap.get(phone) || null;
    },

    findById: async (id) => {
      return [...studentsMap.values()].find(s => s.id === id) || null;
    },

    create: async (data) => {
      const student = {
        id: `stu_${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        isActive: 1
      };
      studentsMap.set(student.phone, student);
      return student;
    },

    exists: async (phone) => {
      return studentsMap.has(phone);
    },

    all: async () => {
      return [...studentsMap.values()];
    }
  },

  tracking: {
    get: async (id) => {
      return trackingMap.get(id) || null;
    },

    findByPhone: async (phone) => {
      return [...trackingMap.values()].find(t => t.phone.replace(/\s/g, '') === phone.replace(/\s/g, '')) || null;
    },

    set: async (id, record) => {
      const updated = { ...record, updatedAt: new Date().toISOString() };
      trackingMap.set(id, updated);
      return updated;
    }
  }
};
