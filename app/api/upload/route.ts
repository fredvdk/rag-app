
import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { loadPDF } from '@/lib/loader';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return new Response('No file', { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public');
  await fs.mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, file.name);
  await fs.writeFile(filePath, buffer);
  await loadPDF(filePath);
  return Response.json({ message: 'Uploaded', path: filePath });
}
