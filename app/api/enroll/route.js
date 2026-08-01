export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request) {
  try {
    const authUser = getUserFromRequest(request);
    const { courseId, phone } = await request.json();

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required.' }, { status: 400 });
    }

    let targetStudentId = authUser?.id;
    let student = null;

    if (targetStudentId) {
      student = await db.students.findById(targetStudentId);
    } else if (phone) {
      student = await db.students.findByPhone(phone);
    }

    if (!student) {
      return NextResponse.json({ error: 'Student not found. Please log in first.' }, { status: 401 });
    }

    let enrolled = [];
    try {
      enrolled = JSON.parse(student.enrolledCourses || '[]');
    } catch (e) {
      enrolled = [];
    }

    if (!enrolled.includes(courseId)) {
      enrolled.push(courseId);
      await db.students.updateEnrollments(student.id, enrolled);
    }

    return NextResponse.json({
      success: true,
      message: 'Enrolled successfully!',
      enrolledCourses: enrolled,
    });
  } catch (err) {
    console.error('[/api/enroll]', err);
    return NextResponse.json({ error: 'Enrollment failed.' }, { status: 500 });
  }
}
