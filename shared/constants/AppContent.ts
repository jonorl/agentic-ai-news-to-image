 export const architectureNodes = [
    { title: 'Data Ingestion', description: 'HTTP Request fetches real-time headlines from BBC News and Al Jazeera via NewsAPI', icon: '📡' },
    { title: 'AI Agent (Dual Model)', description: 'Gemini 2.0 Flash analyzes impact with Groq Llama 3.3 70B fallback for reliability', icon: '🤖' },
    { title: 'Memory System', description: '10-headline buffer with PostgreSQL prevents duplicate selections and tracks history', icon: '🧠' },
    { title: 'Image Pipeline', description: 'Flux1 Schnell via Hugging Face generates images, uploaded to Cloudinary CDN', icon: '🎨' },
  ];

  export const features = [
    { title: 'Dual AI Architecture', description: 'Primary Gemini 2.0 Flash with Groq Llama 3.3 70B fallback ensures 99.9% uptime and reliability.', icon: '⚡' },
    { title: 'Smart Memory Buffer', description: '10-headline PostgreSQL memory prevents repetitive selections while maintaining context awareness.', icon: '🎯' },
    { title: 'Production-Grade Pipeline', description: 'Flux1 Schnell via Hugging Face Inference API + Cloudinary CDN delivers high-quality images with global distribution.', icon: '🚀' },
    { title: 'Multi-Source Aggregation', description: 'NewsAPI combines BBC and Al Jazeera for comprehensive, balanced international coverage.', icon: '🌍' },
    { title: 'Automated State Management', description: 'Database automatically rotates entries, keeping last 7 days while marking active content.', icon: '🔄' },
    { title: 'Dual Trigger System', description: 'Supports both scheduled cron jobs and webhook triggers for flexible deployment strategies.', icon: '⏰' },
  ];

  export const pipelineSteps = [
    { step: '1', title: 'Trigger', desc: 'Webhook or scheduled cron job initiates workflow' },
    { step: '2', title: 'Data Collection', desc: 'Fetches NewsAPI headlines, merges with 10-headline memory buffer, and formats for AI agent' },
    { step: '3', title: 'AI Selection', desc: 'Gemini evaluates 30 headlines for impact and uniqueness, outputs headline + 20-word description' },
    { step: '4', title: 'Memory Update', desc: 'Adds selected headline to PostgreSQL history' },
    { step: '5', title: 'Image Generation', desc: 'Flux1 Schnell creates artistic representation via Hugging Face Inference API' },
    { step: '6', title: 'Cloud Upload', desc: 'Cloudinary stores image and returns CDN URL' },
    { step: '7', title: 'Database Commit', desc: 'Saves entry with active status, deactivates old entries, keeps last 7 for rotation' },
    { step: '8', title: 'Response', desc: 'Returns JSON to webhook caller with complete data' },
  ];

  export const techStack = [
    { name: 'n8n' }, { name: 'Gemini 2.0' }, { name: 'Groq Llama' },
    { name: 'Flux1' }, { name: 'HuggingFace' }, { name: 'Cloudinary' },
    { name: 'PostgreSQL' }, { name: 'NewsAPI' }, { name: 'Docker' },
    { name: 'Node' }, { name: 'React' }, { name: 'Tailwind' },
  ];