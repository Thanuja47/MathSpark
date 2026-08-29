export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    const items = await db.timetable.all();
    const tokenUser = getUserFromRequest(request);

    let approvedGrades = [];
    let isAdmin = false;

    if (tokenUser) {
      if (tokenUser.role === 'admin') {
        isAdmin = true;
      } else {
        const student = await db.students.findByIdWithGrades(tokenUser.id);
        if (student) {
          approvedGrades = (student.gradeAccess || []).map(g => Number(g.gradeId));
        }
      }
    }

    // Sanitize liveLink: only include it if user is admin OR student approved for that item's grade
    const sanitized = items.map(item => {
      const hasAccess = isAdmin || approvedGrades.includes(Number(item.grade));
      return {
        ...item,
        liveLink: hasAccess ? (item.liveLink || null) : null
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
