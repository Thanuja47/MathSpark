export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const course = await db.courses.findById(id);
    if (!course) {
      return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
    }

    const lessons = await db.courseLessons.byCourseId(id);
    const tokenUser = getUserFromRequest(request);

    let gradeAccessRecords = [];
    let isAdmin = false;

    if (tokenUser) {
      if (tokenUser.role === 'admin') {
        isAdmin = true;
      } else {
        const student = await db.students.findByIdWithGrades(tokenUser.id);
        if (student) {
          gradeAccessRecords = student.gradeAccess || [];
        }
      }
    }

    const filtered = lessons.map(lesson => {
      const contentMonth = lesson.month || course.month || null;
      const hasAccess = isAdmin || db.students.hasGradeMonthAccess(gradeAccessRecords, course.grade, contentMonth);
      if (!hasAccess) {
        return {
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          order: lesson.order,
          month: lesson.month,
          pdfUrl: null,
          videoUrl: null,
          _locked: true,
          _lockedMessage: `You need Grade ${course.grade} access for ${contentMonth ? formatMonth(contentMonth) : 'this month'} to view this lesson.`,
        };
      }
      return { ...lesson, _locked: false };
    });

    return NextResponse.json({ success: true, lessons: filtered });
  } catch (err) {
    console.error('[GET /api/courses/[id]/lessons]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

function formatMonth(yyyyMM) {
  if (!yyyyMM) return '';
  const [year, month] = yyyyMM.split('-');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${months[parseInt(month, 10) - 1] || month} ${year}`;
}