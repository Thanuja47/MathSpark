/**
 * prisma/seed.js — Seeds the Supabase DB with admin + test student + tracking records
 * Run: npx prisma db seed
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Admin — phone: 0712345678, password: admin123
  await prisma.student.upsert({
    where: { phone: '0712345678' },
    update: {},
    create: {
      id:              'stu_admin',
      name:            'Ishan Maduranga',
      phone:           '0712345678',
      passwordHash:    '$2b$12$ZBZgpLlIBsKEPiifx6KglOGb1e9K/Y92NdE0ohfhd68uz0iLi0vG6',
      grade:           11,
      medium:          'sinhala',
      role:            'admin',
      enrolledCourses: JSON.stringify(['1','2','3','4','5','6','7','8']),
      isActive:        true,
    },
  });

  // Test student — phone: 0779876543, password: password123
  await prisma.student.upsert({
    where: { phone: '0779876543' },
    update: {},
    create: {
      id:              'stu_001',
      name:            'Kavindi Perera',
      phone:           '0779876543',
      passwordHash:    '$2b$12$ZZEQI48o9nZBNIrbuEoyhuhNWmQEkY0feghDGCqFkxcOfNPWMdFs6',
      grade:           10,
      medium:          'sinhala',
      role:            'student',
      enrolledCourses: JSON.stringify(['1','2']),
      isActive:        true,
    },
  });

  // Tracking records
  await prisma.tracking.upsert({
    where:  { id: 'MSP-9842' },
    update: {},
    create: {
      id:      'MSP-9842',
      student: 'Kavindi Perera',
      phone:   '0779876543',
      item:    'Grade 10 Tute Month 05',
      status:  'In Transit',
      courier: 'Pronto Lanka',
    },
  });

  await prisma.tracking.upsert({
    where:  { id: 'MSP-9841' },
    update: {},
    create: {
      id:      'MSP-9841',
      student: 'Tharindu Silva',
      phone:   '0779876543',
      item:    'Grade 11 Past Paper Pack',
      status:  'Delivered',
      courier: 'Domex',
    },
  });

  console.log('✅ Seed complete');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
