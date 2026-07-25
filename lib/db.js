import path from 'path';
import sqlite3 from 'sqlite3';

const dbPath = path.join(process.cwd(), 'mathspark.db');
const verboseSqlite = sqlite3.verbose();

// Singleton DB connection
let dbInstance = null;

function getDb() {
  if (!dbInstance) {
    dbInstance = new verboseSqlite.Database(dbPath);
    initTables(dbInstance);
  }
  return dbInstance;
}

function initTables(db) {
  db.serialize(() => {
    // Students table
    db.run(`
      CREATE TABLE IF NOT EXISTS students (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL,
        grade INTEGER NOT NULL,
        medium TEXT DEFAULT 'sinhala',
        enrolledCourses TEXT DEFAULT '[]',
        createdAt TEXT NOT NULL,
        isActive INTEGER DEFAULT 1
      )
    `);

    // Seed default test account if not existing
    db.get(`SELECT id FROM students WHERE phone = '0712345678'`, (err, row) => {
      if (!row) {
        db.run(`
          INSERT INTO students (id, name, phone, passwordHash, grade, medium, enrolledCourses, createdAt, isActive)
          VALUES ('stu_001', 'Kavindi Perera', '0712345678', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY9g2v0O/OC5I.m', 10, 'sinhala', '["1","2"]', datetime('now'), 1)
        `);
      }
    });

    // Tracking table
    db.run(`
      CREATE TABLE IF NOT EXISTS tracking (
        id TEXT PRIMARY KEY,
        student TEXT NOT NULL,
        phone TEXT NOT NULL,
        item TEXT NOT NULL,
        status TEXT NOT NULL,
        courier TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `);

    // Seed tracking records
    db.get(`SELECT id FROM tracking WHERE id = 'MSP-9842'`, (err, row) => {
      if (!row) {
        db.run(`
          INSERT INTO tracking (id, student, phone, item, status, courier, updatedAt)
          VALUES ('MSP-9842', 'Kavindi Perera', '0712345678', 'Grade 10 Tute Month 05', 'In Transit', 'Pronto Lanka', datetime('now'))
        `);
        db.run(`
          INSERT INTO tracking (id, student, phone, item, status, courier, updatedAt)
          VALUES ('MSP-9841', 'Tharindu Silva', '0779876543', 'Grade 11 Past Paper Pack', 'Delivered', 'Domex', datetime('now'))
        `);
      }
    });
  });
}

// Export promisified helper API matching our lib/db.js contract
export const db = {
  students: {
    findByPhone: (phone) => {
      const database = getDb();
      return new Promise((resolve, reject) => {
        database.get(`SELECT * FROM students WHERE phone = ?`, [phone], (err, row) => {
          if (err) return reject(err);
          if (!row) return resolve(null);
          try {
            row.enrolledCourses = JSON.parse(row.enrolledCourses || '[]');
          } catch {
            row.enrolledCourses = [];
          }
          resolve(row);
        });
      });
    },

    findById: (id) => {
      const database = getDb();
      return new Promise((resolve, reject) => {
        database.get(`SELECT * FROM students WHERE id = ?`, [id], (err, row) => {
          if (err) return reject(err);
          if (!row) return resolve(null);
          try {
            row.enrolledCourses = JSON.parse(row.enrolledCourses || '[]');
          } catch {
            row.enrolledCourses = [];
          }
          resolve(row);
        });
      });
    },

    create: (data) => {
      const database = getDb();
      const student = {
        id: `stu_${Date.now()}`,
        ...data,
        enrolledCourses: JSON.stringify(data.enrolledCourses || []),
        createdAt: new Date().toISOString(),
        isActive: 1
      };
      return new Promise((resolve, reject) => {
        database.run(
          `INSERT INTO students (id, name, phone, passwordHash, grade, medium, enrolledCourses, createdAt, isActive)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [student.id, student.name, student.phone, student.passwordHash, student.grade, student.medium, student.enrolledCourses, student.createdAt, student.isActive],
          function (err) {
            if (err) return reject(err);
            student.enrolledCourses = data.enrolledCourses || [];
            resolve(student);
          }
        );
      });
    },

    exists: async (phone) => {
      const database = getDb();
      return new Promise((resolve, reject) => {
        database.get(`SELECT id FROM students WHERE phone = ?`, [phone], (err, row) => {
          if (err) return reject(err);
          resolve(!!row);
        });
      });
    },

    all: () => {
      const database = getDb();
      return new Promise((resolve, reject) => {
        database.all(`SELECT * FROM students`, [], (err, rows) => {
          if (err) return reject(err);
          resolve(rows.map(r => ({
            ...r,
            enrolledCourses: JSON.parse(r.enrolledCourses || '[]')
          })));
        });
      });
    }
  },

  tracking: {
    get: (id) => {
      const database = getDb();
      return new Promise((resolve, reject) => {
        database.get(`SELECT * FROM tracking WHERE id = ?`, [id], (err, row) => {
          if (err) return reject(err);
          resolve(row || null);
        });
      });
    },

    findByPhone: (phone) => {
      const database = getDb();
      return new Promise((resolve, reject) => {
        database.get(`SELECT * FROM tracking WHERE phone = ?`, [phone], (err, row) => {
          if (err) return reject(err);
          resolve(row || null);
        });
      });
    },

    set: (id, record) => {
      const database = getDb();
      return new Promise((resolve, reject) => {
        database.run(
          `INSERT OR REPLACE INTO tracking (id, student, phone, item, status, courier, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [id, record.student, record.phone, record.item, record.status, record.courier, new Date().toISOString()],
          (err) => {
            if (err) return reject(err);
            resolve(record);
          }
        );
      });
    }
  }
};
