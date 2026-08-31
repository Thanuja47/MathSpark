const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const courses = await prisma.course.findMany();
  console.log('Total Courses:', courses.length);
  courses.forEach(c => {
    console.log('ID:', c.id, '| Title:', c.title, '| Grade:', c.grade, '| Month:', c.month, '| sampleVideoUrl:', c.sampleVideoUrl);
  });
  await prisma.$disconnect();
}
main();
