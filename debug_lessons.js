const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findFirst({
    where: { title: { contains: 'Grade 10' } }
  });

  if (course) {
    console.log('Course ID:', course.id, '| Title:', course.title);
    const lessons = await prisma.courseLesson.findMany({
      where: { courseId: course.id }
    });
    console.log('Total Lessons for Course:', lessons.length);
    lessons.forEach(l => {
      console.log('Lesson:', l.title, '| videoUrl:', l.videoUrl, '| pdfUrl:', l.pdfUrl);
    });
  } else {
    console.log('No Grade 10 course found. Listing all lessons:');
    const lessons = await prisma.courseLesson.findMany();
    console.log('Total CourseLessons in DB:', lessons.length);
    lessons.forEach(l => {
      console.log('Lesson:', l.title, '| courseId:', l.courseId, '| videoUrl:', l.videoUrl, '| pdfUrl:', l.pdfUrl);
    });
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
