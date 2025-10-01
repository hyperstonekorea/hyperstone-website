import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'HYPERSTONE - 건설업계의 혁신적인 솔루션';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0082FB 0%, #0064E0 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
            padding: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
              letterSpacing: '-2px',
            }}
          >
            HYPERSTONE
          </h1>
          <p
            style={{
              fontSize: '32px',
              margin: '0 0 20px 0',
              opacity: 0.9,
            }}
          >
            건설업계의 혁신적인 솔루션
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '24px',
                fontWeight: '600',
              }}
            >
              DULITE 브랜드
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '24px',
                fontWeight: '600',
              }}
            >
              콘크리트 전문
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}