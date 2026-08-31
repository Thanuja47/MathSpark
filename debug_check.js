const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany({ orderBy: { grade: 'asc' } });
  console.log('TOTAL COURSES:', courses.length);
  courses.forEach(c => console.log('  Grade:', c.grade, '| Month:', JSON.stringify(c.month), '| Title:', c.title.slice(0,50)));

  const student = await prisma.student.findFirst({
    where: { phone: '0726946031' },
    include: { gradeAccess: true }
  });
  if (student) {
    console.log('\nSTUDENT gradeAccess records:', student.gradeAccess.length);
    student.gradeAccess.forEach(g => console.log('  gradeId:', g.gradeId, '| month:', JSON.stringify(g.month), '| expiresAt:', g.expiresAt));
  } else {
    console.log('\nSTUDENT NOT FOUND by phone 0726946031');
    const students = await prisma.student.findMany({ take: 5, select: { name: true, phone: true, grade: true } });
    console.log('Sample students:', JSON.stringify(students));
  }

  await prisma.$disconnect();
}
main().catch(e => { console.error(e.message); process.exit(1); });
