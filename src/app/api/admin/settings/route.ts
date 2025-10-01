import { NextRequest, NextResponse } from 'next/server';
import { readAdminSettings, writeAdminSettings, validateAdminSettings } from '@/lib/admin-config';
import { verifyAdminAuth, createUnauthorizedResponse } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  // Verify admin authentication
  if (!verifyAdminAuth(request)) {
    return createUnauthorizedResponse();
  }

  try {
    const settings = await readAdminSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to read admin settings:', error);
    return NextResponse.json(
      { success: false, message: '설정을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Verify admin authentication
  if (!verifyAdminAuth(request)) {
    return createUnauthorizedResponse();
  }

  try {
    const body = await request.json();

    // Validate the settings structure
    if (!validateAdminSettings(body)) {
      return NextResponse.json(
        { success: false, message: '잘못된 설정 형식입니다.' },
        { status: 400 }
      );
    }

    // Save the settings
    await writeAdminSettings(body);

    return NextResponse.json({
      success: true,
      message: '설정이 저장되었습니다.',
      data: body
    });
  } catch (error) {
    console.error('Failed to save admin settings:', error);
    return NextResponse.json(
      { success: false, message: '설정 저장에 실패했습니다.' },
      { status: 500 }
    );
  }
}