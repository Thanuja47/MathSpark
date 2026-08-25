/**
 * Delete seed/test tracking records from Supabase
 * Run: node prisma/delete-seed-tracking.js
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const seedIds = ['MSP-9842', 'MSP-9841', 'MSP-9328'];

  for (const id of seedIds) {
    try {
      await prisma.tracking.delete({ where: { id } });
      console.log(`✅ Deleted seed tracking record: ${id}`);
    } catch (err) {
      if (err.code === 'P2025') {
        console.log(`⚠️  ${id} not found in DB (already deleted or never existed)`);
      } else {
        console.error(`❌ Error deleting ${id}:`, err.message);
      }
    }
  }

  // List what remains
  const remaining = await prisma.tracking.findMany();
  console.log(`\n📋 Remaining tracking records in DB: ${remaining.length}`);
  remaining.forEach(r => console.log(`  - ${r.id}: ${r.student} (${r.phone})`));
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
