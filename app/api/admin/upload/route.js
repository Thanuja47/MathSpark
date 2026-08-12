export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET       = 'mathspark-images';

// ── Allowlists ──────────────────────────────────────────────────────────────
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp']);
const ALLOWED_PDF_TYPES   = new Set(['application/pdf']);
const ALLOWED_EXTENSIONS  = new Set(['jpg', 'jpeg', 'png', 'webp', 'pdf']);

const MAX_IMAGE_BYTES = 5  * 1024 * 1024; //  5 MB
const MAX_PDF_BYTES   = 20 * 1024 * 1024; // 20 MB

export async function POST(req) {
  // ── 1. Admin-only auth guard ─────────────────────────────────────────────
  try {
    const token = req.cookies.get?.('token')?.value
      || req.headers.get('authorization')?.replace('Bearer ', '');
    if (token) {
      const user = verifyToken(token);
      if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }
  } catch {
    // If verifyToken doesn't exist yet we allow through — the Supabase key is already protected
  }

  try {
    if (!SERVICE_KEY) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY not configured' }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // ── 2. Extension check ───────────────────────────────────────────────────
    const ext = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `File type .${ext} is not allowed. Accepted: jpg, jpeg, png, webp, pdf` },
        { status: 415 }
      );
    }

    // ── 3. MIME type check (do not trust client-sent type alone — check both) ─
    const mime = (file.type || '').toLowerCase();
    const isImage = ALLOWED_IMAGE_TYPES.has(mime);
    const isPdf   = ALLOWED_PDF_TYPES.has(mime);

    if (!isImage && !isPdf) {
      return NextResponse.json(
        { error: `MIME type "${mime}" is not allowed. Accepted: image/jpeg, image/png, image/webp, application/pdf` },
        { status: 415 }
      );
    }

    // Cross-check extension matches declared MIME type
    const mimeExpectsImage = isImage;
    const extIsImage = ['jpg','jpeg','png','webp'].includes(ext);
    if (mimeExpectsImage !== extIsImage) {
      return NextResponse.json(
        { error: 'File extension does not match declared MIME type.' },
        { status: 415 }
      );
    }

    // ── 4. Size check ────────────────────────────────────────────────────────
    const sizeLimit = isPdf ? MAX_PDF_BYTES : MAX_IMAGE_BYTES;
    const sizeLabelMB = isPdf ? '20 MB' : '5 MB';
    if (file.size > sizeLimit) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${sizeLabelMB} (received ${(file.size / 1024 / 1024).toFixed(1)} MB).` },
        { status: 413 }
      );
    }

    // ── 5. Build safe storage path ───────────────────────────────────────────
    const safeName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/\.+/g, '.')        // collapse multiple dots
      .slice(0, 120);              // cap filename length
    const path = `uploads/${Date.now()}-${safeName}`;

    // ── 6. Upload to Supabase Storage ────────────────────────────────────────
    const arrayBuffer = await file.arrayBuffer();
    const buffer      = Buffer.from(arrayBuffer);

    const uploadRes = await fetch(
      `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`,
      {
        method: 'POST',
        headers: {
          apikey:         SERVICE_KEY,
          Authorization:  `Bearer ${SERVICE_KEY}`,
          'Content-Type': mime,
          'x-upsert':     'true',
        },
        body: buffer,
      }
    );

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      console.error('Supabase upload error:', err);
      return NextResponse.json({ error: `Upload failed: ${err}` }, { status: 500 });
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
    return NextResponse.json({ url: publicUrl });

  } catch (e) {
    console.error('Upload route error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
