import { useNews } from '.././hooks/useNews'
import { architectureNodes } from '../../../shared/constants/AppContent'

export function ArchitectureNodes() {
  const { newsData, loading, isStaticMode, loadingMessage, lastUpdated, error, fetchStatic, fetchDynamic } = useNews();
  return (
    <>
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10">System Architecture</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {architectureNodes.map((node, idx) => (
            <div
              key={idx}
              className="group relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-violet-500/0 group-hover:from-emerald-500/5 group-hover:to-violet-500/5 rounded-xl transition-all duration-500" />
              <div className="relative">
                <div className="text-4xl mb-4">{node.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{node.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{node.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live Demo Controls */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">Live Demo</h2>

          {/* Control Panel */}
          <div className="mb-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold mb-1">Execution Mode</h3>
                <p className="text-sm text-neutral-400">
                  {isStaticMode ? 'Viewing pre-generated content from database' : 'Live workflow execution in progress'}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={fetchStatic}
                  disabled={loading}
                  className="px-6 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg font-medium text-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Fetch Static
                </button>
                <button
                  onClick={fetchDynamic}
                  disabled={loading}
                  className="px-6 py-2.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 hover:border-violet-500/50 rounded-lg font-medium text-violet-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Run Workflow
                </button>
              </div>
            </div>

            {lastUpdated && (
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Last updated: {lastUpdated}
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-lg flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div className="flex-1">
                <p className="font-medium mb-1">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Smart Loading Overlay */}
          {loading && (
            <div className="mb-6 p-8 bg-gradient-to-br from-emerald-500/5 to-violet-500/5 border border-emerald-500/20 rounded-xl">
              <div className="flex flex-col items-center justify-center space-y-4">
                {/* Animated spinner */}
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-neutral-700 border-t-emerald-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
                </div>

                {/* Rotating message */}
                <div className="text-center">
                  <p className="text-emerald-400 font-medium mb-1 animate-pulse">
                    {loadingMessage}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Full workflow execution: 30-60 seconds (free-tier services)
                  </p>
                </div>

                {/* Progress dots */}
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-emerald-500"
                      style={{
                        animation: 'pulse 1.5s ease-in-out infinite',
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Text Output */}
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${newsData ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
                <span className="text-xs font-medium text-neutral-500 tracking-wider uppercase">Headline Output</span>
              </div>

              <div className="space-y-4">
                <div className="bg-neutral-950/50 rounded-lg p-5 border border-neutral-800">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2 font-medium">Selected Headline</p>
                  <p className="text-base leading-relaxed text-neutral-300">
                    {newsData?.headline || 'Loading today\'s headline...'}
                  </p>
                </div>

                <div className="bg-neutral-950/50 rounded-lg p-5 border border-neutral-800">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2 font-medium">Visual Description (max 20 words)</p>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {newsData?.description || 'AI-generated visual description will appear here'}
                  </p>
                </div>
              </div>
            </div>

            {/* Image Output */}
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${newsData ? 'bg-violet-500 animate-pulse' : 'bg-neutral-600'}`} />
                <span className="text-xs font-medium text-neutral-500 tracking-wider uppercase">Generated Image</span>
              </div>

              <div className="aspect-[4/3] bg-neutral-950/50 rounded-lg border border-neutral-800 flex items-center justify-center relative overflow-hidden group">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 border-4 border-neutral-700 border-t-violet-500 rounded-full animate-spin" />
                      <p className="text-xs text-neutral-500">Flux1 generating image...</p>
                    </div>
                  </div>
                ) : newsData?.imageUrl ? (
                  <img
                    src={newsData.imageUrl}
                    alt={newsData.headline}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23171717" width="400" height="300"/%3E%3Ctext fill="%23525252" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage failed to load%3C/text%3E%3C/svg%3E';
                    }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative text-center p-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-violet-500/20 flex items-center justify-center text-3xl">
                        🖼️
                      </div>
                      <p className="text-sm text-neutral-500 mb-1">Loading image...</p>
                      <p className="text-xs text-neutral-600">Via Flux1 Schnell (or fallback) + Cloudinary</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}