import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/**
 * Create email transporter using environment variables
 */
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

/**
 * Send email using the configured transporter
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  // Check if email configuration is available
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration missing. Please check EMAIL_USER and EMAIL_PASS environment variables.');
  }

  try {
    const transporter = createEmailTransporter();

    const mailOptions = {
      from: `"HYPERSTONE" <${process.env.EMAIL_USER}>`,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    
  } catch (error) {
    console.error('Email sending error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('EAUTH') || error.message.includes('authentication')) {
        throw new Error('Email authentication failed. Please check EMAIL_USER and EMAIL_PASS.');
      } else if (error.message.includes('ECONNECTION') || error.message.includes('connection')) {
        throw new Error('Cannot connect to email server. Please check EMAIL_HOST and EMAIL_PORT.');
      } else if (error.message.includes('SMTP')) {
        throw new Error('SMTP configuration error. Please check email settings.');
      }
    }
    
    throw new Error('Failed to send email. Please check email configuration.');
  }
}

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}