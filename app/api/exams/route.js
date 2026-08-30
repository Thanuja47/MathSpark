export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    const exams = await db.exams.all();
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

    // Filter exams: student can only see exams for grade+month they're approved for
    const filtered = exams.map(exam => {
      const hasAccess = isAdmin || db.students.hasGradeMonthAccess(gradeAccessRecords, exam.grade, exam.month);
      if (!hasAccess) {
        // Return exam shell without questions so student knows it exists but is locked
        return {
          id: exam.id,
          title: exam.title,
          grade: exam.grade,
          month: exam.month,
          duration: exam.duration,
          questions: '[]',
          _locked: true,
        };
      }
      return { ...exam, _locked: false };
    });

    return NextResponse.json(filtered);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch exams' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const exam = await db.exams.create(data);
    return NextResponse.json(exam, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create exam' }, { status: 500 });
  }
}
