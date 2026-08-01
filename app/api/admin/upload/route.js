export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET       = 'mathspark-images';

export async function POST(req) {
  try {
    if (!SERVICE_KEY) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Build a unique path: uploads/<timestamp>-<originalname>
    const ext      = file.name.split('.').pop().toLowerCase();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path     = `uploads/${Date.now()}-${safeName}`;

    // Convert File → ArrayBuffer → Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer      = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage via REST (works with both old JWT and new sb_secret keys)
    const uploadRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`,
      {
        method: 'POST',
        headers: {
          apikey:          SERVICE_KEY,
          Authorization:   `Bearer ${SERVICE_KEY}`,
          'Content-Type':  file.type || 'application/octet-stream',
          'x-upsert':      'true',
        },
        body: buffer,
      }
    );

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      console.error('Supabase upload error:', err);
      return NextResponse.json({ error: `Upload failed: ${err}` }, { status: 500 });
    }

    // Return the public URL
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
    return NextResponse.json({ url: publicUrl });

  } catch (e) {
    console.error('Upload route error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
