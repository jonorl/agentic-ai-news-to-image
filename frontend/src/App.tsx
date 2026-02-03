import { useState, useEffect } from 'react';

interface NewsData {
  headline: string;
  description: string;
  imageUrl: string;
  timestamp?: string;
}

export default function NewsWorkflowDemo() {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Replace with your actual n8n webhook URL
  const WEBHOOK_URL = 'https://test--news-to-image--6qlkrj2746gd.code.run/webhook/news-workflow';

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
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
    } catch (err) {
      console.error("Failed to fetch news:", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on mount (optional - remove if you want manual only)
  useEffect(() => {
    // Uncomment the line below to auto-fetch on page load
    // fetchNews();
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
            An autonomous AI workflow that monitors global news sources, intelligently selects the most impactful headlines, 
            and generates contextual visual representations—while maintaining a 7-day memory to ensure content novelty.
          </p>
        </header>

        {/* System Architecture */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">System Architecture</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Data Ingestion',
                description: 'HTTP Request Tool fetches real-time headlines from BBC News and Al Jazeera',
                icon: '📡',
                color: 'emerald'
              },
              {
                title: 'AI Agent',
                description: 'Google Gemini analyzes headlines, evaluates impact, and ensures uniqueness',
                icon: '🤖',
                color: 'cyan'
              },
              {
                title: 'Memory System',
                description: '7-day buffer window prevents duplicate content selection',
                icon: '🧠',
                color: 'violet'
              },
              {
                title: 'Image Generation',
                description: 'Pollinations.ai creates visual representations from headlines',
                icon: '🎨',
                color: 'fuchsia'
              }
            ].map((node, idx) => (
              <div 
                key={idx}
                className="group relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all duration-300"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {node.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{node.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{node.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow Logic */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">Intelligent Decision Making</h2>
          
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-8">
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Headline Acquisition',
                  description: 'The agent queries BBC News and Al Jazeera endpoints to retrieve the latest global headlines in real-time.'
                },
                {
                  step: '02',
                  title: 'Contextual Analysis',
                  description: 'Gemini evaluates each headline for impact, relevance, and newsworthiness using natural language understanding.'
                },
                {
                  step: '03',
                  title: 'Memory Comparison',
                  description: 'The system checks 7-day conversation memory to identify and skip previously processed topics.'
                },
                {
                  step: '04',
                  title: 'Selection & Generation',
                  description: 'The most impactful unique headline is selected, and a visual description is crafted.'
                },
                {
                  step: '05',
                  title: 'Visual Synthesis',
                  description: 'Pollinations.ai transforms the textual description into a compelling visual representation.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-violet-500/20 border border-neutral-800 flex items-center justify-center text-neutral-400 font-mono text-sm font-bold group-hover:border-emerald-500/50 transition-colors duration-300">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-emerald-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Output Demo */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Latest Output</h2>
            <button
              onClick={fetchNews}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <span>⚡</span>
                  Trigger Workflow
                </>
              )}
            </button>
          </div>

          {lastUpdated && (
            <div className="mb-4 text-sm text-neutral-500">
              Last updated: {lastUpdated}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              Error: {error}
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
                    {newsData?.headline || 'Click "Trigger Workflow" to fetch the latest news headline'}
                  </p>
                </div>
                
                <div className="bg-neutral-950/50 rounded-lg p-5 border border-neutral-800">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2 font-medium">Visual Description</p>
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
                {newsData?.imageUrl ? (
                  <img 
                    src={newsData.imageUrl} 
                    alt={newsData.headline}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative text-center p-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-violet-500/20 flex items-center justify-center text-3xl">
                        🖼️
                      </div>
                      <p className="text-sm text-neutral-500 mb-1">Generated image will be displayed here</p>
                      <p className="text-xs text-neutral-600">Via Pollinations.ai</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">Technology Stack</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              'n8n',
              'Google Gemini',
              'Pollinations.ai',
              'LangChain',
              'BBC News',
              'Al Jazeera'
            ].map((tech, idx) => (
              <div 
                key={idx}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-4 text-center hover:border-neutral-700 transition-all duration-300"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-violet-500/20 flex items-center justify-center text-lg font-bold">
                  {tech.charAt(0)}
                </div>
                <p className="text-xs text-neutral-400">{tech}</p>
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
                title: 'Autonomous Operation',
                description: 'Fully automated workflow requires no human intervention from data collection to image generation.',
                icon: '⚡'
              },
              {
                title: 'Intelligent Deduplication',
                description: 'Memory system prevents repetitive content by tracking 7 days of processed headlines.',
                icon: '🎯'
              },
              {
                title: 'Multi-Source Aggregation',
                description: 'Combines perspectives from multiple international news sources for comprehensive coverage.',
                icon: '🌍'
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
    </div>
  );
}