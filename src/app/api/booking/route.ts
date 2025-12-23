import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // 1. Extract Data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const service = formData.get('service') as string;
    const date = formData.get('date') as string;
    const files = formData.getAll('images') as File[];

    // Prepare attachments (Using Buffers for Vercel/Cloud compatibility)
    const attachmentsForEmail: { filename: string; content: Buffer }[] = [];
    
    for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachmentsForEmail.push({
            filename: file.name,
            content: buffer 
        });
    }

    // ---------------------------------------------------------
    // NEW: Send to Google Sheets
    // ---------------------------------------------------------
    try {
        if (process.env.GOOGLE_SHEET_URL) {
            const sheetData = new URLSearchParams();
            sheetData.append('name', name);
            sheetData.append('email', email);
            sheetData.append('phone', phone);
            sheetData.append('service', service);
            sheetData.append('date', new Date(date).toLocaleString());

            await fetch(process.env.GOOGLE_SHEET_URL, {
                method: 'POST',
                body: sheetData,
            });
            console.log('Google Sheet updated');
        } else {
            console.log('GOOGLE_SHEET_URL not set, skipping sheet update.');
        }
    } catch (sheetError) {
        // We log the error but DO NOT stop the request, 
        // ensuring the email/DB parts still happen.
        console.error('Google Sheet Error:', sheetError);
    }
    // ---------------------------------------------------------

    // 2. Send Emails
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email to Admin (You)
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'techiesans@gmail.com',
            subject: `✨ New Booking: ${name} (${service})`,
            text: `
New Booking Alert!

Client: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Date: ${new Date(date).toLocaleString()}

See attached photos for assessment.
            `,
            attachments: attachmentsForEmail
        });

        // Email to Client (Confirmation)
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Booking Confirmation - Rama Care Aesthetics`,
            text: `
Hello ${name},

Thank you for booking with Rama Care Aesthetics!

We have received your request for:
Service: ${service}
Date: ${new Date(date).toLocaleString()}

IMPORTANT NEXT STEPS:
1. A non-refundable deposit of GH₵50 is required to validate your booking.
2. The deposit will be deducted from your total treatment cost.
3. Our location: Ashongman Estate 2nd Lotto Kiosk.

We look forward to seeing you soon!

Best regards,
Rama Care Team
            `
        });

        console.log('Emails sent successfully');
    } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // We don't return an error here so the user still gets a success message if DB fails but email works
    }

    // 3. Save to Database (Optional/Try-Catch for robustness)
    try {
        // Note: We aren't saving file paths to disk here to keep it Vercel-compatible
        const imageNote = files.length > 0 ? ["Images sent via email"] : [];

        await db.execute(
          'INSERT INTO bookings (first_name, email, phone_number, service_interest, appointment_date, image_paths) VALUES (?, ?, ?, ?, ?, ?)',
          [name, email, phone, service, date, JSON.stringify(imageNote)]
        );
    } catch (dbError) {
        console.warn('Database insert failed (Ignore if using Vercel without Cloud DB):', dbError);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('General Booking Error:', error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}