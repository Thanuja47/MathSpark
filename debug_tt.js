const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const timetable = await prisma.timetable.findMany({ orderBy: { grade: 'asc' } });
  console.log('TIMETABLE ENTRIES:', timetable.length);
  timetable.forEach(t => console.log(
    '  Grade:', t.grade,
    '| Month:', JSON.stringify(t.month),
    '| Day:', t.day,
    '| Time:', t.time,
    '| liveLink:', t.liveLink ? t.liveLink.slice(0, 60) + '...' : 'NULL'
  ));
  await prisma.$disconnect();
}
main().catch(e => { console.error(e.message); process.exit(1); });
