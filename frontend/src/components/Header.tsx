export function Header() {
  return (
    <header className="mb-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-medium text-emerald-400 tracking-wider uppercase">Portfolio Project</span>
      </div>

      <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
        Agentic News Intelligence
        <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
          System
        </span>
      </h1>

      <p className="text-lg lg:text-xl text-neutral-400 max-w-3xl leading-relaxed">
        An autonomous AI workflow that monitors global news sources, intelligently selects the most impactful headlines
        using dual AI models with fallback, and generates high-quality visual representations via Flux1 (or Pollinations as fallback) while maintaining
        a 10-headline memory buffer to ensure content novelty.
      </p>
    </header>
  )
}