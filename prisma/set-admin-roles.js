/**
 * MathSpark — Admin Access Setup Script
 * Assigns 'admin' role to 0713486268 and 0729298096 (94729298096)
 * Run: node prisma/set-admin-roles.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ADMIN_PHONES = ['0713486268', '0729298096'];

async function main() {
  console.log('Setting admin roles in Supabase database...\n');

  for (const rawPhone of ADMIN_PHONES) {
    // Check exact phone matches (handles 0713486268, 0729298096, +94729298096)
    const students = await prisma.student.findMany({
      where: {
        OR: [
          { phone: rawPhone },
          { phone: '94' + rawPhone.slice(1) },
          { phone: '+94' + rawPhone.slice(1) },
        ]
      }
    });

    if (students.length === 0) {
      console.log(`⚠️  No account found for ${rawPhone}. Creating placeholder admin account...`);
      const bcrypt = require('bcryptjs');
      const passwordHash = await bcrypt.hash('admin123', 12);

      const newAdmin = await prisma.student.create({
        data: {
          name: rawPhone === '0713486268' ? 'Thanuja Nirmal (Admin)' : 'Ishan Maduranga (Admin)',
          phone: rawPhone,
          passwordHash,
          grade: 11,
          medium: 'sinhala',
          role: 'admin',
          phoneVerified: true,
          enrolledCourses: JSON.stringify([6,7,8,9,10,11]),
        }
      });
      console.log(`  ✅ Admin created: ${newAdmin.name} (${newAdmin.phone}) — Password: admin123`);
    } else {
      for (const s of students) {
        await prisma.student.update({
          where: { id: s.id },
          data: { role: 'admin' }
        });
        console.log(`  ✅ Role updated to ADMIN for: ${s.name} (${s.phone})`);
      }
    }
  }

  console.log('\nFinished updating admin roles!');
}

main()
  .catch(e => console.error('Error setting admin roles:', e))
  .finally(() => prisma.$disconnect());
