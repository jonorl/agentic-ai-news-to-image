export const architectureNodes = [
  { title: 'Data Ingestion', description: 'HTTP Request fetches real-time headlines from BBC News and Al Jazeera via NewsAPI', icon: '📡' },
  { title: 'AI Agent (Dual Model)', description: 'Gemini Flash picks the headline, with GPT-OSS 120B on Groq as a fallback', icon: '🤖' },
  { title: 'Memory System', description: '10-headline buffer with PostgreSQL prevents duplicate selections and tracks history', icon: '🧠' },
  { title: 'Image Pipeline', description: 'Flux.1 Schnell on Cloudflare Workers AI renders the image, with Pollinations as a fallback, then the VPS stores and serves it', icon: '🎨' },
];

export const features = [
  { title: 'Dual AI Architecture', description: 'Gemini Flash selects the headline; if it fails, GPT-OSS 120B on Groq takes over.', icon: '⚡' },
  { title: 'Smart Memory Buffer', description: '10-headline PostgreSQL memory prevents repetitive selections while maintaining context awareness.', icon: '🎯' },
  { title: 'Production-Grade Pipeline', description: 'Flux.1 Schnell renders on Cloudflare Workers AI, Pollinations steps in if it fails, and the API serves the result from the VPS.', icon: '🚀' },
  { title: 'Multi-Source Aggregation', description: 'NewsAPI combines BBC and Al Jazeera for comprehensive, balanced international coverage.', icon: '🌍' },
  { title: 'Automated State Management', description: 'The database keeps the last 7 stories and marks the latest scheduled one as active.', icon: '🔄' },
  { title: 'Dual Trigger System', description: 'Runs daily on a schedule, and on demand from Run Workflow, which is rate-limited to protect the free API quotas.', icon: '⏰' },
];

export const pipelineSteps = [
  { step: '1', title: 'Trigger', desc: 'The daily schedule, or Run Workflow on this page' },
  { step: '2', title: 'Data Collection', desc: 'Fetches NewsAPI headlines, merges with 10-headline memory buffer, and formats for AI agent' },
  { step: '3', title: 'AI Selection', desc: 'The agent (Gemini, or GPT-OSS on Groq) weighs up to 30 headlines for impact and novelty, and outputs one with a 20-word visual description' },
  { step: '4', title: 'Memory Update', desc: 'Adds selected headline to PostgreSQL history' },
  { step: '5', title: 'Image Generation', desc: 'Flux.1 Schnell renders the description on Cloudflare Workers AI, with Pollinations as a fallback' },
  { step: '6', title: 'Image Storage', desc: 'Saves the image on the VPS, where the API serves it; a weekly job clears out old ones' },
  { step: '7', title: 'Database Commit', desc: 'Saves the story and keeps the last 7; a scheduled run becomes the one everyone sees' },
  { step: '8', title: 'Response', desc: 'Returns the headline, description and image URL to whoever ran it' },
];

export const techStack = [
  { name: 'n8n', color: 'from-red-500/20 to-pink-500/20' },
  { name: 'Gemini', color: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'Groq', color: 'from-indigo-500/20 to-purple-500/20' },
  { name: 'Flux.1', color: 'from-purple-500/20 to-violet-500/20' },
  { name: 'Workers AI', color: 'from-yellow-500/20 to-orange-500/20' },
  { name: 'Expo', color: 'from-blue-600/20 to-indigo-500/20' },
  { name: 'PostgreSQL', color: 'from-slate-500/20 to-gray-500/20' },
  { name: 'NewsAPI', color: 'from-orange-500/20 to-red-500/20' },
  { name: 'Docker', color: 'from-red-600/20 to-orange-500/20' },
  { name: 'Node', color: 'from-emerald-500/20 to-teal-500/20' },
  { name: 'React', color: 'from-red-500/20 to-pink-500/20' },
  { name: 'Tailwind', color: 'from-emerald-500/20 to-teal-500/20' }
];