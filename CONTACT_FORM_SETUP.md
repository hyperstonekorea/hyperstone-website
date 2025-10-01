# Contact Form Setup Guide

## Overview
The contact form system allows visitors to send inquiries through the website. The system includes:
- Client-side form validation
- Server-side API endpoint with data sanitization
- Email sending functionality using Nodemailer
- Multi-language support (Korean/English)

## Environment Variables Setup

Create a `.env.local` file in the project root with the following variables:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_RECIPIENT=admin@hyperstone.co.kr
```

### Gmail Setup Instructions

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password as `EMAIL_PASS`

### Alternative Email Services

**SendGrid (Recommended for Production)**:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

**Outlook/Hotmail**:
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

## Features

### Client-Side Validation
- Real-time input validation
- Email format validation
- Korean phone number format support
- Multi-language error messages
- Form state management (idle, submitting, success, error)

### Server-Side Security
- Input sanitization to prevent XSS
- Data validation and type checking
- Rate limiting (can be added)
- Error handling and logging

### Email Template
- Professional HTML email template
- Company branding (HYPERSTONE colors)
- Structured data presentation
- Auto-reply capability (can be enabled)

## API Endpoint

**POST** `/api/contact`

**Request Body**:
```json
{
  "name": "John Doe",
  "phone": "010-1234-5678",
  "email": "john@example.com",
  "message": "Your inquiry message here"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Your inquiry has been sent successfully"
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Name is required", "Invalid email format"]
}
```

## Testing

### Local Testing
1. Set up environment variables
2. Start the development server: `npm run dev`
3. Navigate to the contact section
4. Fill out and submit the form
5. Check the configured email inbox

### Production Testing
- Test with various email providers
- Verify spam folder delivery
- Test form validation edge cases
- Monitor server logs for errors

## Troubleshooting

### Common Issues

**"Email service is not configured"**:
- Check that all EMAIL_* environment variables are set
- Verify EMAIL_USER and EMAIL_PASS are correct

**"Authentication failed"**:
- For Gmail: Ensure 2FA is enabled and using App Password
- For other providers: Check username/password combination

**Emails going to spam**:
- Set up SPF/DKIM records for your domain
- Use a dedicated email service like SendGrid
- Avoid spam trigger words in email content

**Form validation errors**:
- Check browser console for JavaScript errors
- Verify translation keys exist in messages files
- Test with different input formats

## Security Considerations

1. **Input Sanitization**: All inputs are sanitized to prevent XSS attacks
2. **Rate Limiting**: Consider adding rate limiting to prevent spam
3. **CAPTCHA**: Consider adding CAPTCHA for additional spam protection
4. **Email Validation**: Server-side email format validation
5. **Error Handling**: Generic error messages to prevent information disclosure

## Future Enhancements

- [ ] Add CAPTCHA integration
- [ ] Implement rate limiting
- [ ] Add auto-reply functionality
- [ ] Create admin dashboard for managing inquiries
- [ ] Add file attachment support
- [ ] Implement inquiry tracking system