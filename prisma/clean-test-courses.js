const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.course.deleteMany({
    where: {
      OR: [
        { title: { contains: 'kohomd', mode: 'insensitive' } },
        { title: { contains: 'hello', mode: 'insensitive' } }
      ]
    }
  });
  console.log('✅ Cleaned up test courses:', deleted.count);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
