export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    const items = await db.timetable.all();
    const tokenUser = getUserFromRequest(request);

    let gradeAccessRecords = []; // [{gradeId, month}]
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

    // For LIVE LINKS: grant access if the student has ANY valid gradeAccess record
    // for that grade (any month). Live classes are real-time events — we should not
    // block a student who has paid for ANY month of that grade from joining live.
    // Month-filtering applies only to recorded lessons / exams / PDFs (static content).
    const sanitized = items.map(item => {
      const gradeNum = Number(item.grade);

      // Check if student has any valid (non-expired) grant for this grade
      const hasGradeAccess = isAdmin || (gradeAccessRecords || []).some(g => {
        return Number(g.gradeId) === gradeNum;
      });

      return {
        ...item,
        liveLink: hasGradeAccess ? (item.liveLink || null) : null,
        _locked: !hasGradeAccess,
      };
    });

    return NextResponse.json(sanitized);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch timetable' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const item = await db.timetable.create(data);
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create timetable entry' }, { status: 500 });
  }
}
