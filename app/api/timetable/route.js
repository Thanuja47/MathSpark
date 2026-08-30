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

    // Sanitize liveLink: only include it if user is admin OR student has grade+month access
    const sanitized = items.map(item => {
      const hasAccess = isAdmin || db.students.hasGradeMonthAccess(gradeAccessRecords, item.grade, item.month);
      return {
        ...item,
        liveLink: hasAccess ? (item.liveLink || null) : null,
        _locked: !hasAccess,
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
