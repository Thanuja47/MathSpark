const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findFirst({
    where: { title: { contains: 'Grade 10' } }
  });
  const student = await prisma.student.findFirst({
    where: { phone: '0726946031' },
    include: { gradeAccess: true }
  });

  console.log('Course month:', JSON.stringify(course.month), '| Grade:', course.grade);
  console.log('Student gradeAccess:', JSON.stringify(student.gradeAccess));

  // Test hasGradeMonthAccess
  const hasGradeMonthAccess = (gradeAccessRecords, gradeId, contentMonth) => {
    const gId = Number(gradeId);
    return (gradeAccessRecords || []).some(g => {
      if (Number(g.gradeId) !== gId) return false;
      if (g.month === null || g.month === undefined) return true;
      if (!contentMonth) return true;
      // Plain string compare test
      return g.month === contentMonth;
    });
  };

  const res1 = hasGradeMonthAccess(student.gradeAccess, course.grade, course.month);
  console.log('Plain string compare hasGradeMonthAccess result:', res1);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
