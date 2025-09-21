import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
	try {
		const { name, email, message, subject } = await req.json();
		const timestamp = new Date().toISOString();

		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: 'Missing required fields', timestamp },
				{ status: 400 },
			);
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: 'Invalid email format', timestamp },
				{ status: 400 },
			);
		}

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		// Format timestamp for better readability
		const formattedTime = new Date().toLocaleString('vi-VN', {
			timeZone: 'Asia/Ho_Chi_Minh',
		});

		// Include subject if provided
		const emailSubject = subject
			? `New Contact from ${name}: ${subject}`
			: `New Contact from ${name}`;

		await transporter.sendMail({
			from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
			to: process.env.MAIL_RECEIVER,
			subject: emailSubject,
			html: `
				<h2>Bạn có tin nhắn mới</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
				<p><strong>Message:</strong></p>
				<p>${message}</p>
				<p><strong>Timestamp:</strong> ${formattedTime}</p>
			`,
		});

		return NextResponse.json({
			success: true,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{
				error: 'Failed to send email',
				timestamp: new Date().toISOString(),
			},
			{ status: 500 },
		);
	}
}
