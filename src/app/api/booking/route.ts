import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // 1. Extract Data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const service = formData.get('service') as string;
    const date = formData.get('date') as string;
    const files = formData.getAll('images') as File[];

    const savedFilePaths: string[] = [];
    const attachmentsForEmail: { filename: string; path: string }[] = [];

    // 2. Save Images to Disk
    if (files.length > 0) {
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        
        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = Date.now() + '-' + file.name.replace(/\s/g, '_');
            const filepath = path.join(uploadDir, filename);
            
            await writeFile(filepath, buffer);
            
            savedFilePaths.push(`/uploads/${filename}`);
            
            // Prepare attachment for email
            attachmentsForEmail.push({
                filename: file.name,
                path: filepath 
            });
        }
    }

    // 3. Save to Database
    await db.execute(
      'INSERT INTO bookings (first_name, email, service_interest, appointment_date, image_paths) VALUES (?, ?, ?, ?, ?)',
      [name, email, service, date, JSON.stringify(savedFilePaths)]
    );

    // 4. Send Email Alert
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: 'techiesans@gmail.com',   // Your email (Receiver)
            subject: `✨ New Booking: ${name} (${service})`,
            text: `
Hello Rama Care,

You have a new appointment request!

------------------------------------------
Client Name:   ${name}
Client Email:  ${email}
Service:       ${service}
Requested Date: ${new Date(date).toLocaleString()}
------------------------------------------

The client has attached ${files.length} photo(s) for assessment. 
They are attached to this email and saved in your system.

Best,
Rama Care Booking Bot
            `,
            // Attach the uploaded skin photos directly to the email
            attachments: attachmentsForEmail
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

    } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // We don't fail the request here, just log the error
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Booking Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}