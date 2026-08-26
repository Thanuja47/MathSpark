const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function enableAllRLS() {
  console.log('Enabling RLS on remaining tables...');

  await prisma.$executeRawUnsafe(`ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "StudentGradeAccess" ENABLE ROW LEVEL SECURITY;`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "CourseLesson" ENABLE ROW LEVEL SECURITY;`);

  // Add Public Read Access policies if not present
  await prisma.$executeRawUnsafe(`
    DO $$ 
    BEGIN 
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'CourseLesson' AND policyname = 'Public Read Access') THEN
        CREATE POLICY "Public Read Access" ON "CourseLesson" FOR SELECT USING (true);
      END IF;
    END $$;
  `);

  console.log('✓ RLS enabled on ALL public tables!');
}

enableAllRLS()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
