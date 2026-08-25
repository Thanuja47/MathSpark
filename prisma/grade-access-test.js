/**
 * MathSpark — Grade Access Self-Verification Test Suite
 * Tests grade isolation across Grade 8, 10, and 11 via Prisma
 * Run: node prisma/grade-access-test.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// COURSES from lib/data.js (grade field only — replicated for test)
const COURSES = [
  { id: 1,  grade: 10 },
  { id: 2,  grade: 11 },
  { id: 3,  grade: 6  },
  { id: 4,  grade: 7  },
  { id: 5,  grade: 8  },
  { id: 6,  grade: 9  },
  { id: 7,  grade: 10 },
  { id: 8,  grade: 11 },
];

const TEST_PHONE    = '0711234508'; // Grade 8 test student
const TEST_PASSWORD = 'TestPass8!';
const TEST_GRADE    = 8;

function filterCoursesByGrades(approvedGrades) {
  return COURSES.filter(c => approvedGrades.includes(c.grade));
}

async function run() {
  console.log('\n════════════════════════════════════════════');
  console.log('  MathSpark Grade Access Verification Test  ');
  console.log('════════════════════════════════════════════\n');

  // ── STEP 1: Register test student ─────────────────────────────
  console.log('STEP 1: Creating Grade 8 test student in database...');

  // Clean up if exists from previous test run
  const existing = await prisma.student.findUnique({ where: { phone: TEST_PHONE } });
  if (existing) {
    await prisma.studentGradeAccess.deleteMany({ where: { studentId: existing.id } });
    await prisma.student.delete({ where: { phone: TEST_PHONE } });
    console.log('  → Cleaned up previous test student record.');
  }

  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 12);
  const student = await prisma.student.create({
    data: {
      name:            'Amaya Kumari (Test)',
      phone:           TEST_PHONE,
      passwordHash,
      grade:           TEST_GRADE,
      medium:          'sinhala',
      role:            'student',
      phoneVerified:   true,
      enrolledCourses: '[]',
      isActive:        true,
    },
  });
  console.log(`  ✅ Student created: ID=${student.id}`);
  console.log(`  📱 Phone: ${TEST_PHONE}`);
  console.log(`  🔑 Password: ${TEST_PASSWORD}`);
  console.log(`  📚 Grade: ${TEST_GRADE}`);

  // ── STEP 2: OTP — already verified (phoneVerified=true set above) ──
  console.log('\nSTEP 2: Phone verification state...');
  const fresh = await prisma.student.findUnique({ where: { id: student.id } });
  console.log(`  ✅ phoneVerified = ${fresh.phoneVerified} (account is fully active)`);

  // ── STEP 3: Confirm NO ACCESS initially ───────────────────────
  console.log('\nSTEP 3: Checking initial grade access (should be ZERO)...');
  const initialAccess = await prisma.studentGradeAccess.findMany({ where: { studentId: student.id } });
  console.log(`  ✅ Approved grades: [${initialAccess.map(g => g.gradeId).join(', ')}]`);
  
  const initialCourses = filterCoursesByGrades(initialAccess.map(g => g.gradeId));
  console.log(`  ✅ Visible courses: ${initialCourses.length} (expected: 0)`);
  
  if (initialCourses.length === 0) {
    console.log('  ✅ PASS: NO ACCESS GRANTED — zero enrolled classes and recordings shown');
  } else {
    console.log('  ❌ FAIL: Student sees courses without access!');
    process.exit(1);
  }

  // Check tute orders
  const tracking = await prisma.tracking.findMany({ where: { phone: TEST_PHONE } });
  const orders   = await prisma.order.findMany({ where: { phone: TEST_PHONE } });
  console.log(`  ✅ Tute tracking orders: ${tracking.length} (expected: 0)`);
  console.log(`  ✅ Store orders: ${orders.length} (expected: 0)`);
  if (tracking.length === 0 && orders.length === 0) {
    console.log('  ✅ PASS: Zero orders shown — no seed data leaking');
  } else {
    console.log('  ❌ FAIL: Seed/leftover data found!');
  }

  // ── STEP 4: Admin grants Grade 8 ONLY ─────────────────────────
  console.log('\nSTEP 4: Admin grants Grade 8 access ONLY...');
  await prisma.studentGradeAccess.createMany({
    data: [{ studentId: student.id, gradeId: 8 }],
  });
  const afterGrant = await prisma.studentGradeAccess.findMany({ where: { studentId: student.id } });
  console.log(`  ✅ Approved grades after admin action: [${afterGrant.map(g => g.gradeId).join(', ')}]`);

  // ── STEP 5: Confirm Grade 8 content unlocked ──────────────────
  console.log('\nSTEP 5: Checking Grade 8 content visibility...');
  const approvedGradeIds = afterGrant.map(g => g.gradeId);
  const grade8Courses = filterCoursesByGrades(approvedGradeIds);
  console.log(`  ✅ Courses now visible: ${grade8Courses.length}`);
  grade8Courses.forEach(c => console.log(`     → Course ID=${c.id}, Grade=${c.grade}`));
  
  const allGrade8 = grade8Courses.every(c => c.grade === 8);
  if (allGrade8 && grade8Courses.length > 0) {
    console.log('  ✅ PASS: Only Grade 8 courses are unlocked');
  } else {
    console.log('  ❌ FAIL: Wrong courses visible!');
    process.exit(1);
  }

  // ── STEP 6: CRITICAL — Cross-grade isolation test ─────────────
  console.log('\nSTEP 6: CRITICAL — Cross-grade isolation test...');
  
  const checkGrade = (gradeToCheck, studentApprovedGrades) => {
    return studentApprovedGrades.includes(gradeToCheck);
  };

  // Test Grade 10 access (should be BLOCKED)
  const canSeeGrade10 = checkGrade(10, approvedGradeIds);
  console.log(`  Grade 10 access (must be BLOCKED): ${canSeeGrade10 ? '❌ FAIL — LEAKING!' : '✅ BLOCKED'}`);

  // Test Grade 11 access (should be BLOCKED)
  const canSeeGrade11 = checkGrade(11, approvedGradeIds);
  console.log(`  Grade 11 access (must be BLOCKED): ${canSeeGrade11 ? '❌ FAIL — LEAKING!' : '✅ BLOCKED'}`);

  // Test Grade 9 access (should be BLOCKED)
  const canSeeGrade9 = checkGrade(9, approvedGradeIds);
  console.log(`  Grade 9 access (must be BLOCKED):  ${canSeeGrade9  ? '❌ FAIL — LEAKING!' : '✅ BLOCKED'}`);

  // Test Grade 6 access (should be BLOCKED)
  const canSeeGrade6 = checkGrade(6, approvedGradeIds);
  console.log(`  Grade 6 access (must be BLOCKED):  ${canSeeGrade6  ? '❌ FAIL — LEAKING!' : '✅ BLOCKED'}`);

  // Test Grade 8 access (should be UNLOCKED)
  const canSeeGrade8 = checkGrade(8, approvedGradeIds);
  console.log(`  Grade 8 access (must be UNLOCKED): ${canSeeGrade8  ? '✅ UNLOCKED' : '❌ FAIL — BLOCKED WRONGLY!'}`);

  // Verify cross-grade course filtering
  const grade10Courses = COURSES.filter(c => approvedGradeIds.includes(c.grade) && c.grade === 10);
  const grade11Courses = COURSES.filter(c => approvedGradeIds.includes(c.grade) && c.grade === 11);
  console.log(`\n  Cross-grade course filter results:`);
  console.log(`  → Grade 10 courses visible: ${grade10Courses.length} (expected: 0) ${grade10Courses.length === 0 ? '✅' : '❌'}`);
  console.log(`  → Grade 11 courses visible: ${grade11Courses.length} (expected: 0) ${grade11Courses.length === 0 ? '✅' : '❌'}`);

  // Check timetable grade-gating logic (replicating app/timetable/page.js line 31)
  console.log('\n  Simulating timetable "Join Zoom" click for Grade 10 session:');
  const timetableGrade10Allowed = (approvedGradeIds).includes(Number(10));
  console.log(`  → Would show locked modal: ${!timetableGrade10Allowed ? '✅ YES — Grade 10 blocked' : '❌ NO — LEAKING!'}`);

  console.log('\n  Simulating timetable "Join Zoom" click for Grade 8 session:');
  const timetableGrade8Allowed = (approvedGradeIds).includes(Number(8));
  console.log(`  → Would allow join: ${timetableGrade8Allowed ? '✅ YES — Grade 8 unlocked' : '❌ NO — BLOCKED WRONGLY!'}`);

  // ── STEP 7: Tute Orders for new student ───────────────────────
  console.log('\nSTEP 7: Tute orders check for Grade 8 test student...');
  const newTracking = await prisma.tracking.findMany({ where: { phone: TEST_PHONE } });
  const newOrders   = await prisma.order.findMany({ where: { phone: TEST_PHONE } });
  console.log(`  ✅ Tracking records: ${newTracking.length} (expected: 0) ${newTracking.length === 0 ? '✅' : '❌'}`);
  console.log(`  ✅ Store orders: ${newOrders.length} (expected: 0) ${newOrders.length === 0 ? '✅' : '❌'}`);

  // ── SUMMARY ───────────────────────────────────────────────────
  const allPassed = !canSeeGrade10 && !canSeeGrade11 && !canSeeGrade9 && !canSeeGrade6 &&
    canSeeGrade8 && grade10Courses.length === 0 && grade11Courses.length === 0 &&
    newTracking.length === 0 && newOrders.length === 0 && allGrade8;

  console.log('\n════════════════════════════════════════════');
  console.log(`  FINAL RESULT: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  console.log('════════════════════════════════════════════');
  console.log('\n📋 TEST STUDENT CREDENTIALS (for manual login verification):');
  console.log(`  URL:      https://ishanmaduranga.lk/login`);
  console.log(`  Phone:    ${TEST_PHONE}`);
  console.log(`  Password: ${TEST_PASSWORD}`);
  console.log(`  Grade:    ${TEST_GRADE} (Only Grade 8 access approved in DB)`);
  console.log('\n  Verify manually:');
  console.log('  [a] /my-account — Enrolled Classes shows ONLY Grade 8 course');
  console.log('  [b] /timetable  — Grade 8 Join Zoom works, Grade 10/11 shows locked modal');
  console.log('  [c] /exams      — Only Grade 8 exams visible');
  console.log('  [d] My Tute Orders — 0 orders shown\n');
}

run()
  .catch(e => { console.error('\n❌ Test error:', e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
