import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, message: '비밀번호가 필요합니다.' },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set');
      return NextResponse.json(
        { success: false, message: '서버 설정 오류입니다.' },
        { status: 500 }
      );
    }

    const isValid = password === adminPassword;

    if (isValid) {
      // Create a simple session token (in production, use proper JWT or session management)
      const sessionToken = Buffer.from(`admin:${Date.now()}`).toString('base64');
      
      const response = NextResponse.json({ 
        success: true, 
        message: '로그인 성공',
        token: sessionToken
      });

      // Set HTTP-only cookie for session management
      response.cookies.set('admin-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/' // Changed from '/admin' to work across all admin routes
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: '잘못된 비밀번호입니다.' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}