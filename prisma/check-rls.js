const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRLS() {
  const result = await prisma.$queryRawUnsafe(`
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public';
  `);
  console.log('=== SUPABASE TABLES RLS STATUS ===');
  console.table(result);

  const policies = await prisma.$queryRawUnsafe(`
    SELECT tablename, policyname, roles, cmd 
    FROM pg_policies 
    WHERE schemaname = 'public';
  `);
  console.log('=== RLS POLICIES ===');
  console.table(policies);
}

checkRLS()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
