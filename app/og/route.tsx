import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at top, #0ea5ff, #020617)',
          color: '#f8fafc',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 700 }}>Karting Évasion Rumilly</div>
          <div style={{ fontSize: 28, marginTop: 20 }}>
            Deux pistes outdoor, sensations premium
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
