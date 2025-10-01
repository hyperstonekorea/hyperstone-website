import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ContactFormData } from '@/types';

// Input validation and sanitization
function validateAndSanitizeInput(data: unknown): { isValid: boolean; errors: string[]; sanitizedData?: ContactFormData } {
  const errors: string[] = [];
  
  // Check if data exists
  if (!data || typeof data !== 'object') {
    errors.push('Invalid request data');
    return { isValid: false, errors };
  }

  const { name, phone, email, message } = data as Record<string, unknown>;

  // Validate and sanitize name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required');
  } else if (name.trim().length > 100) {
    errors.push('Name is too long (max 100 characters)');
  }

  // Validate and sanitize phone
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    errors.push('Phone number is required');
  } else {
    const phoneRegex = /^(\+82|0)([0-9]{1,2})-?([0-9]{3,4})-?([0-9]{4})$|^[\d\s\-\+\(\)]{8,15}$/;
    const cleanPhone = phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errors.push('Invalid phone number format');
    }
  }

  // Validate and sanitize email
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Invalid email format');
    }
  }

  // Validate and sanitize message
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.push('Message is required');
  } else if (message.trim().length > 2000) {
    errors.push('Message is too long (max 2000 characters)');
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize data (trim whitespace and basic HTML escape)
  const sanitizedData: ContactFormData = {
    name: (name as string).trim().replace(/[<>]/g, ''),
    phone: (phone as string).trim().replace(/[<>]/g, ''),
    email: (email as string).trim().toLowerCase(),
    message: (message as string).trim().replace(/[<>]/g, '')
  };

  return { isValid: true, errors: [], sanitizedData };
}

// Create email transporter
function createEmailTransporter() {
  const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };

  return nodemailer.createTransport(emailConfig);
}

// Generate email content
function generateEmailContent(data: ContactFormData) {
  const { name, phone, email, message } = data;
  
  const subject = `[HYPERSTONE] 새로운 문의: ${name}님으로부터`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0082FB, #0064E0); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0082FB; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #0082FB; }
        .message-content { white-space: pre-wrap; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>HYPERSTONE 웹사이트 문의</h2>
          <p>새로운 고객 문의가 접수되었습니다.</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">이름 (Name):</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">연락처 (Phone):</div>
            <div class="value">${phone}</div>
          </div>
          <div class="field">
            <div class="label">이메일 (Email):</div>
            <div class="value">${email}</div>
          </div>
          <div class="field">
            <div class="label">문의내용 (Message):</div>
            <div class="value message-content">${message}</div>
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #666;">
            이 메일은 HYPERSTONE 웹사이트(hyperstone.co.kr)의 문의 양식을 통해 자동으로 발송되었습니다.<br>
            접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
HYPERSTONE 웹사이트 문의

이름: ${name}
연락처: ${phone}
이메일: ${email}

문의내용:
${message}

---
접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
이 메일은 HYPERSTONE 웹사이트의 문의 양식을 통해 자동으로 발송되었습니다.
  `;

  return { subject, html: htmlContent, text: textContent };
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate and sanitize input
    const validation = validateAndSanitizeInput(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed', 
          errors: validation.errors 
        },
        { status: 400 }
      );
    }

    const sanitizedData = validation.sanitizedData!;

    // Check if email configuration is available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service is not configured' 
        },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = createEmailTransporter();

    // Generate email content
    const emailContent = generateEmailContent(sanitizedData);

    // Email options
    const mailOptions = {
      from: `"HYPERSTONE 웹사이트" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      replyTo: sanitizedData.email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Log successful submission (without sensitive data)
    console.log(`Contact form submitted successfully by ${sanitizedData.name} (${sanitizedData.email})`);

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been sent successfully'
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Return generic error message to client
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while sending your inquiry. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}