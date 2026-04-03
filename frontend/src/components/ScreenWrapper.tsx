// components/AppLayout.tsx
interface LayoutProps {
  children: React.ReactNode;
}

export function ScreenWrapper({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-emerald-500/30">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/20 via-neutral-950 to-violet-950/20" />
      <div 
        className="fixed inset-0 opacity-20" 
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} 
      />

      {/* Main Content Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-24">
        {children}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}