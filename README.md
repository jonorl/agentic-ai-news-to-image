# Agentic News Intelligence System

An autonomous AI workflow that monitors global news sources, intelligently selects the most impactful headlines using dual AI models with fallback, and generates high-quality visual representations via Flux1—while maintaining a 10-headline memory buffer to ensure content novelty.

## Project Overview

This system demonstrates advanced workflow automation and AI orchestration by combining multiple services into a cohesive pipeline that:
- Fetches real-time news from multiple international sources
- Uses AI agents to evaluate and select the most impactful headlines
- Maintains memory to prevent repetitive content
- Generates artistic visual representations automatically
- Manages state and stores results in a database

## System Architecture

### Core Components

1. **Data Ingestion**
   - HTTP Request Tool fetches real-time headlines from BBC News and Al Jazeera via NewsAPI
   - Parallel execution for optimal performance

2. **AI Agent (Dual Model)**
   - Primary: Google Gemini 2.0 Flash analyzes headlines for impact and uniqueness
   - Fallback: Groq Llama 3.3 70B ensures uptime and reliability
   - Outputs selected headline + 20-word visual description

3. **Memory System**
   - PostgreSQL-backed 10-headline buffer prevents duplicate selections
   - Tracks previously selected content to ensure novelty
   - Automatic cleanup maintains optimal buffer size

4. **Image Pipeline**
   - Flux1 Schnell via Hugging Face Inference API generates artistic representations
   - Cloudinary CDN for fast, global image delivery
   - Automatic upload and URL generation

## Execution Pipeline

```
1. Trigger → Webhook or scheduled cron job initiates workflow

2. Data Collection → Fetches NewsAPI headlines, merges with 10-headline 
   memory buffer, and formats for AI agent

3. AI Selection → Gemini evaluates 30 headlines for impact and uniqueness, 
   outputs headline + 20-word description

4. Memory Update → Adds selected headline to PostgreSQL history

5. Image Generation → Flux1 Schnell creates artistic representation 
   via Hugging Face Inference API

6. Cloud Upload → Cloudinary stores image and returns CDN URL

7. Database Commit → Saves entry with active status, deactivates old entries, 
   keeps last 7 for rotation

8. Response → Returns JSON to webhook caller with complete data
```

## Technology Stack

### Backend & Orchestration
- **n8n** - Workflow automation and orchestration
- **PostgreSQL** - Database for memory system and content storage
- **Docker** - Containerization for deployment

### AI & Machine Learning
- **Google Gemini 2.0 Flash** - Primary LLM for headline selection
- **Groq Llama 3.3 70B** - Fallback LLM for reliability
- **Flux1 Schnell** - Text-to-image generation model
- **Hugging Face Inference API** - ML model hosting

### Data & Storage
- **NewsAPI** - News aggregation service
- **Cloudinary** - Image CDN and storage
- **BBC News** - Primary news source
- **Al Jazeera** - Secondary news source

### Frontend
- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Node.js** - JavaScript runtime

### Prerequisites
- Docker and Docker Compose
- n8n instance (self-hosted or cloud)
- PostgreSQL database
- API keys for:
  - Google Gemini
  - Groq
  - Hugging Face
  - Cloudinary

### AI Agent Prompt
The system uses a carefully crafted prompt to guide headline selection:
```
#ROLE
You are an editorial selector for a news-to-art website.

#TASK
Choose ONE impactful, globally relevant news headline from the list below.

#SELECTION CRITERIA
1. Pick the most impactful and globally relevant headline
2. Avoid headlines substantially similar to previously selected ones
3. "Substantially similar" means same event, person, or topic
4. If all headlines are similar, choose the least similar option

#OUTPUT FORMAT (STRICT)
Return ONLY a valid JSON object:
{
  "headline": "exact headline text from the numbered list",
  "description": "short visual description, max 20 words, concrete imagery"
}
```

## Performance Considerations

- **Execution Time**: 30-60 seconds on free-tier services
- **API Rate Limits**: NewsAPI has daily limits, plan accordingly
- **Image Generation**: Flux1 Schnell typically takes 10-20 seconds
- **Database**: PostgreSQL hosted on free Neon db service

## Acknowledgments and thanks

- n8n community for workflow automation tools
- Hugging Face for ML infrastructure
- NewsAPI for news aggregation
- Black Forest Labs for Flux1 model

## Contact

[Jonathan Orlowski](https://jonathan-orlowski.pages.dev/)

Project Link: [https://github.com/jonorl/agentic-ai-news-to-image](https://github.com/jonorl/agentic-ai-news-to-image)