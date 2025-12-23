// src/app/api/booking/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const service = formData.get('service') as string;
    const files = formData.getAll('images') as File[];

    const savedFilePaths: string[] = [];

    // Save images to public/uploads
    if (files.length > 0) {
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        // NOTE: Manually create the 'public/uploads' folder first!
        
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = Date.now() + '-' + file.name.replace(/\s/g, '_');
            const filepath = path.join(uploadDir, filename);
            await writeFile(filepath, buffer);
            savedFilePaths.push(`/uploads/${filename}`);
        }
    }

    // Insert into MySQL
    await db.execute(
      'INSERT INTO bookings (first_name, email, service_interest, image_paths) VALUES (?, ?, ?, ?)',
      [name, email, service, JSON.stringify(savedFilePaths)]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
