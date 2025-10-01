import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, createUnauthorizedResponse } from '@/lib/auth-middleware';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  // Verify admin authentication
  if (!verifyAdminAuth(request)) {
    return createUnauthorizedResponse();
  }

  try {
    const { email, testMessage } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: '이메일 주소가 필요합니다.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // Prepare test email content
    const emailContent = {
      to: email,
      subject: '[HYPERSTONE] 테스트 이메일',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0082FB;">HYPERSTONE 테스트 이메일</h2>
          <p>안녕하세요,</p>
          <p>이것은 HYPERSTONE 관리자 패널에서 발송된 테스트 이메일입니다.</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>테스트 메시지:</strong></p>
            <p>${testMessage || '이메일 발송 기능이 정상적으로 작동하고 있습니다.'}</p>
          </div>
          <p>이 이메일을 받으셨다면 이메일 설정이 올바르게 구성되었습니다.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            이 이메일은 HYPERSTONE 관리자 패널에서 자동으로 발송되었습니다.<br>
            발송 시간: ${new Date().toLocaleString('ko-KR')}
          </p>
        </div>
      `,
      text: `
HYPERSTONE 테스트 이메일

안녕하세요,

이것은 HYPERSTONE 관리자 패널에서 발송된 테스트 이메일입니다.

테스트 메시지: ${testMessage || '이메일 발송 기능이 정상적으로 작동하고 있습니다.'}

이 이메일을 받으셨다면 이메일 설정이 올바르게 구성되었습니다.

발송 시간: ${new Date().toLocaleString('ko-KR')}
      `
    };

    // Send the test email
    await sendEmail(emailContent);

    return NextResponse.json({
      success: true,
      message: '테스트 이메일이 성공적으로 발송되었습니다.'
    });

  } catch (error) {
    console.error('Test email error:', error);
    
    // Provide more specific error messages
    let errorMessage = '테스트 이메일 발송에 실패했습니다.';
    
    if (error instanceof Error) {
      if (error.message.includes('SMTP')) {
        errorMessage = 'SMTP 설정을 확인해주세요. 환경변수가 올바르게 설정되었는지 확인하세요.';
      } else if (error.message.includes('authentication')) {
        errorMessage = '이메일 인증에 실패했습니다. EMAIL_USER와 EMAIL_PASS를 확인해주세요.';
      } else if (error.message.includes('connection')) {
        errorMessage = '이메일 서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.';
      }
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}