import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'NekoJobs - Gestor de Búsqueda Laboral';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #09090b, #18181b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 120px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 60,
            background: '#6d28d9',
            marginBottom: 40,
            boxShadow: '0 0 40px rgba(109, 40, 217, 0.4)',
          }}
        >
          {/* Simple Neko/Cat ears shape or icon representing the logo */}
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <path d="M3.3 7l8.7 5 8.7-5"></path>
            <path d="M12 22V12"></path>
          </svg>
        </div>
        
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.02em',
            marginBottom: 20,
            display: 'flex',
          }}
        >
          NekoJobs
        </div>
        
        <div
          style={{
            fontSize: 42,
            fontWeight: 500,
            color: '#a1a1aa', // text-muted-foreground equivalent
            maxWidth: '800px',
            display: 'flex',
          }}
        >
          Transforma tu búsqueda de empleo en un proceso estructurado, privado y local-first.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
