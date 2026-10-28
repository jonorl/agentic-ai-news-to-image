export const architectureNodes = [
  { title: 'Data Ingestion', description: 'HTTP Request fetches real-time headlines from BBC News and Al Jazeera via NewsAPI', icon: '📡' },
  { title: 'AI Agent (Dual Model)', description: 'Gemini 3.8 Flash picks the headline, with Groq Llama 3.3 70B as a fallback', icon: '🤖' },
  { title: 'Memory System', description: '10-headline buffer with PostgreSQL prevents duplicate selections and tracks history', icon: '🧠' },
  { title: 'Image Pipeline', description: 'Flux.1 Schnell on Hugging Face renders the image, with Leonardo as a fallback, then Cloudinary hosts it', icon: '🎨' },
];

export const features = [
  { title: 'Dual AI Architecture', description: 'Gemini 3.8 Flash selects the headline; if it fails, Groq Llama 3.3 70B takes over.', icon: '⚡' },
  { title: 'Smart Memory Buffer', description: '10-headline PostgreSQL memory prevents repetitive selections while maintaining context awareness.', icon: '🎯' },
  { title: 'Production-Grade Pipeline', description: 'Flux.1 Schnell renders through the Hugging Face Inference API, Leonardo steps in if it fails, and Cloudinary serves the result.', icon: '🚀' },
  { title: 'Multi-Source Aggregation', description: 'NewsAPI combines BBC and Al Jazeera for comprehensive, balanced international coverage.', icon: '🌍' },
  { title: 'Automated State Management', description: 'The database keeps the last 7 stories and marks the latest scheduled one as active.', icon: '🔄' },
  { title: 'Dual Trigger System', description: 'Runs daily on a schedule, and on demand from Run Workflow, which is rate-limited to protect the free API quotas.', icon: '⏰' },
];

export const pipelineSteps = [
  { step: '1', title: 'Trigger', desc: 'The daily schedule, or Run Workflow on this page' },
  { step: '2', title: 'Data Collection', desc: 'Fetches NewsAPI headlines, merges with 10-headline memory buffer, and formats for AI agent' },
  { step: '3', title: 'AI Selection', desc: 'Gemini evaluates 30 headlines for impact and uniqueness, outputs headline + 20-word description' },
  { step: '4', title: 'Memory Update', desc: 'Adds selected headline to PostgreSQL history' },
  { step: '5', title: 'Image Generation', desc: 'Flux.1 Schnell renders the description via the Hugging Face Inference API, with Leonardo as a fallback' },
  { step: '6', title: 'Cloud Upload', desc: 'Cloudinary stores image and returns CDN URL' },
  { step: '7', title: 'Database Commit', desc: 'Saves the story and keeps the last 7; a scheduled run becomes the one everyone sees' },
  { step: '8', title: 'Response', desc: 'Returns the headline, description and image URL to whoever ran it' },
];

export const techStack = [
  { name: 'n8n', color: 'from-red-500/20 to-pink-500/20' },
  { name: 'Gemini', color: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'Groq Llama', color: 'from-indigo-500/20 to-purple-500/20' },
  { name: 'Flux.1', color: 'from-purple-500/20 to-violet-500/20' },
  { name: 'Hugging Face', color: 'from-yellow-500/20 to-orange-500/20' },
  { name: 'Cloudinary', color: 'from-blue-600/20 to-indigo-500/20' },
  { name: 'PostgreSQL', color: 'from-slate-500/20 to-gray-500/20' },
  { name: 'NewsAPI', color: 'from-orange-500/20 to-red-500/20' },
  { name: 'Docker', color: 'from-red-600/20 to-orange-500/20' },
  { name: 'Node', color: 'from-emerald-500/20 to-teal-500/20' },
  { name: 'React', color: 'from-red-500/20 to-pink-500/20' },
  { name: 'Tailwind', color: 'from-emerald-500/20 to-teal-500/20' }
];