import { useState, useEffect } from 'react';

interface NewsData {
  headline: string;
  description: string;
  imageUrl: string;
  timestamp?: string;
}

const LOADING_MESSAGES = [
  "Waking up free-tier servers...",
  "Fetching BBC News & Al Jazeera feeds...",
  "Querying memory buffer (last 10 headlines)...",
  "AI agent analyzing global impact...",
  "Gemini evaluating headline uniqueness...",
  "Selecting most relevant story...",
  "Generating 20-word visual prompt...",
  "Flux1 creating artistic representation...",
  "Uploading to Cloudinary CDN...",
  "Saving to PostgreSQL database...",
  "Updating active entry status...",
  "Almost there..."
];

export default function NewsWorkflowDemo() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [isStaticMode, setIsStaticMode] = useState(true);

  // API URLs
  const STATIC_API_URL = import.meta.env.VITE_BACKEND;
  const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK;

  // Rotate loading messages
  useEffect(() => {
    if (!loading) return;

    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[messageIndex]);
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(interval);
  }, [loading]);

  const fetchStaticNews = async () => {
    setLoading(true);
    setError(null);
    setLoadingMessage(LOADING_MESSAGES[0]);
    
    try {
      const response = await fetch(STATIC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract from nested structure
      const newsItem = data.getActiveNews || data;
      
      setNewsData({
        headline: newsItem.headline,
        description: newsItem.description,
        imageUrl: newsItem.image_url || newsItem.imageUrl
      });
      
      setLastUpdated(new Date().toLocaleString());
      setIsStaticMode(true);
    } catch (err) {
      console.error("Failed to fetch static news:", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news from static API');
    } finally {
      setLoading(false);
    }
  };

  const fetchDynamicNews = async () => {
    setLoading(true);
    setError(null);
    setLoadingMessage(LOADING_MESSAGES[0]);
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setNewsData({
        headline: data.headline,
        description: data.description,
        imageUrl: data.imageUrl
      });
      
      setLastUpdated(new Date().toLocaleString());
      setIsStaticMode(false);
    } catch (err) {
      console.error("Failed to fetch dynamic news:", err);
      setError(err instanceof Error ? err.message : 'Failed to trigger workflow');
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch static news on mount
  useEffect(() => {
    fetchStaticNews();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/20 via-neutral-950 to-violet-950/20" />
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-24">
        {/* Header */}
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
            using dual AI models with fallback, and generates high-quality visual representations via Flux1—while maintaining 
            a 10-headline memory buffer to ensure content novelty.
          </p>
        </header>

        {/* System Architecture */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">System Architecture</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Data Ingestion',
                description: 'HTTP Request fetches real-time headlines from BBC News and Al Jazeera via NewsAPI',
                icon: '📡',
                color: 'emerald'
              },
              {
                title: 'AI Agent (Dual Model)',
                description: 'Gemini 2.0 Flash analyzes impact with Groq Llama 3.3 70B fallback for reliability',
                icon: '🤖',
                color: 'cyan'
              },
              {
                title: 'Memory System',
                description: '10-headline buffer with PostgreSQL prevents duplicate selections and tracks history',
                icon: '🧠',
                color: 'violet'
              },
              {
                title: 'Image Pipeline',
                description: 'Flux1 Schnell via Hugging Face generates images, uploaded to Cloudinary CDN',
                icon: '🎨',
                color: 'fuchsia'
              }
            ].map((node, idx) => (
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
        </section>

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
                  onClick={fetchStaticNews}
                  disabled={loading}
                  className="px-6 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg font-medium text-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Fetch Static
                </button>
                <button
                  onClick={fetchDynamicNews}
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
                      <p className="text-xs text-neutral-600">Via Flux1 Schnell + Cloudinary</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Pipeline */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">Execution Pipeline</h2>
          
          {/* Workflow Visualization */}
          <div className="mb-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 md:p-6 overflow-hidden">
            <p className="mb-4 md:mb-8 text-xs text-neutral-500 text-center mt-2 md:mt-4">n8n Workflow Visualization</p>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="px-4 md:px-0">
                <img 
                  src="workflow.png" 
                  alt="n8n Workflow Diagram"
                  className="w-full h-auto rounded-lg max-w-full"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { step: '1', title: 'Trigger', desc: 'Webhook or scheduled cron job initiates workflow' },
              { step: '2', title: 'Data Collection', desc: 'Fetches NewsAPI headlines, merges with 10-headline memory buffer, and formats for AI agent' },
              { step: '3', title: 'AI Selection', desc: 'Gemini evaluates 30 headlines for impact and uniqueness, outputs headline + 20-word description' },
              { step: '4', title: 'Memory Update', desc: 'Adds selected headline to PostgreSQL history' },
              { step: '5', title: 'Image Generation', desc: 'Flux1 Schnell creates artistic representation via Hugging Face Inference API' },
              { step: '6', title: 'Cloud Upload', desc: 'Cloudinary stores image and returns CDN URL' },
              { step: '7', title: 'Database Commit', desc: 'Saves entry with active status, deactivates old entries, keeps last 7 for rotation' },
              { step: '8', title: 'Response', desc: 'Returns JSON to webhook caller with complete data' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-4 bg-neutral-900/30 backdrop-blur-sm border border-neutral-800/50 rounded-lg p-4 hover:border-neutral-700 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-violet-500/20 flex items-center justify-center text-sm font-bold text-emerald-400 border border-emerald-500/30">
                  {item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-neutral-200 mb-1">{item.title}</h4>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">Technology Stack</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'n8n', color: 'from-red-500/20 to-pink-500/20' },
              { name: 'Gemini 2.0', color: 'from-blue-500/20 to-cyan-500/20' },
              { name: 'Groq Llama', color: 'from-indigo-500/20 to-purple-500/20' },
              { name: 'Flux1 Schnell', color: 'from-purple-500/20 to-violet-500/20' },
              { name: 'Hugging Face', color: 'from-yellow-500/20 to-orange-500/20' },
              { name: 'Cloudinary', color: 'from-blue-600/20 to-indigo-500/20' },
              { name: 'PostgreSQL', color: 'from-slate-500/20 to-gray-500/20' },
              { name: 'NewsAPI', color: 'from-orange-500/20 to-red-500/20' },
              { name: 'Docker', color: 'from-red-600/20 to-orange-500/20' },
              { name: 'Node', color: 'from-emerald-500/20 to-teal-500/20' },
              { name: 'React', color: 'from-red-500/20 to-pink-500/20' },
              { name: 'Tailwind', color: 'from-emerald-500/20 to-teal-500/20' }
            ].map((tech, idx) => (
              <div 
                key={idx}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-4 text-center hover:border-neutral-700 transition-all duration-300"
              >
                <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center text-sm font-bold`}>
                  {tech.name.charAt(0)}
                </div>
                <p className="text-xs text-neutral-400">{tech.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-3xl font-bold mb-10">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Dual AI Architecture',
                description: 'Primary Gemini 2.0 Flash with Groq Llama 3.3 70B fallback ensures 99.9% uptime and reliability.',
                icon: '⚡'
              },
              {
                title: 'Smart Memory Buffer',
                description: '10-headline PostgreSQL memory prevents repetitive selections while maintaining context awareness.',
                icon: '🎯'
              },
              {
                title: 'Production-Grade Pipeline',
                description: 'Flux1 Schnell via Hugging Face Inference API + Cloudinary CDN delivers high-quality images with global distribution.',
                icon: '🚀'
              },
              {
                title: 'Multi-Source Aggregation',
                description: 'NewsAPI combines BBC and Al Jazeera for comprehensive, balanced international coverage.',
                icon: '🌍'
              },
              {
                title: 'Automated State Management',
                description: 'Database automatically rotates entries, keeping last 7 days while marking active content.',
                icon: '🔄'
              },
              {
                title: 'Dual Trigger System',
                description: 'Supports both scheduled cron jobs and webhook triggers for flexible deployment strategies.',
                icon: '⏰'
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8 hover:border-neutral-700 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-neutral-400 text-sm">
                Built by <span className="text-neutral-200 font-semibold">Jonathan Orlowski</span>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/jonorl/agentic-ai-news-to-image"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">GitHub</span>
              </a>
              <a 
                href="mailto:jonorl@gmail.com"
                className="flex items-center gap-2 text-neutral-400 hover:text-emerald-400 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}