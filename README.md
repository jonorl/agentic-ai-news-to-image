# Agentic News-to-Image

[![Test](https://github.com/jonorl/agentic-ai-news-to-image/actions/workflows/test.yml/badge.svg)](https://github.com/jonorl/agentic-ai-news-to-image/actions/workflows/test.yml)
[![Build and Deploy](https://github.com/jonorl/agentic-ai-news-to-image/actions/workflows/deploy.yml/badge.svg)](https://github.com/jonorl/agentic-ai-news-to-image/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/jonorl/agentic-ai-news-to-image/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/jonorl/agentic-ai-news-to-image/security/code-scanning)
[![API status](https://img.shields.io/website?url=https%3A%2F%2Fapi.jonathan-orlowski.dev%2Fhealth&label=api&up_message=healthy&down_message=down)](https://api.jonathan-orlowski.dev/health)
[![Licence](https://img.shields.io/github/license/jonorl/agentic-ai-news-to-image)](LICENSE)

An n8n agent that reads the day's news, picks the headline that matters most, and turns it into an image. An LLM chooses one headline from BBC News and Al Jazeera, avoiding anything too close to its last ten picks, and writes a short visual description that Flux.1 Schnell renders. The result is published to a web page and an Android app. Try it at **https://jonathan-orlowski.dev/agentic-ai-news-to-image/**.

<p align="center">
  <a href="https://jonathan-orlowski.dev/agentic-ai-news-to-image/">
    <img src="docs/preview.gif" alt="Scrolling through the page: the architecture, today's headline and its generated image, a refresh of the stored story, the n8n pipeline and the key features." width="600" />
  </a>
</p>

## Architecture

```mermaid
flowchart LR
    visitors(["Visitors"])
    android(["Android app"])

    subgraph pages["Cloudflare Pages"]
        web["Web app<br/>React, Vite"]
    end

    subgraph vps["VPS, Docker Compose"]
        caddy["Caddy"]
        api["API<br/>Express, Prisma<br/>REST, GraphQL, /health<br/>rate-limited workflow proxy"]
        n8n["n8n workflow"]
    end

    neon[("Neon PostgreSQL<br/>stories, 10-headline memory")]
    news["NewsAPI<br/>BBC, Al Jazeera"]
    llm["Gemini 3.8 Flash<br/>Groq Llama 3.3 70B fallback"]
    img["Flux.1 Schnell on Hugging Face<br/>Leonardo, Pollinations fallbacks"]
    cdn["Cloudinary"]
    gha["GitHub Actions<br/>test, build, deploy, smoke test"]

    visitors --> web
    web -- "stored story (REST)" --> caddy
    android -- "stored story (GraphQL)" --> caddy
    web -- "Run Workflow" --> caddy
    caddy --> api
    api -- "webhook with token" --> n8n
    api --> neon
    n8n --> news
    n8n <--> llm
    n8n --> img
    n8n --> cdn
    n8n --> neon
    web -. "image" .-> cdn
    gha -- "image via GHCR, SSH" --> vps
```

- **The agent runs on a schedule and on demand.** A scheduled run replaces the story everyone sees. "Run Workflow" on the page asks the API, which runs the same pipeline through an n8n webhook and returns the result to that visitor only.
- **It doesn't repeat itself.** The last ten headlines it chose are kept in Postgres and sent to the model with the new ones, with instructions to skip anything about the same event, person or topic.
- **Each model has a fallback.** Groq takes over if Gemini fails, and Leonardo, then Pollinations, if Flux.1 fails.
- **Live runs are rate-limited.** Each run spends free-tier quota on NewsAPI, Gemini and Flux.1, so the API allows each visitor 3 runs an hour and everyone 20 a day. The n8n webhook only accepts calls carrying the API's token, so the limits can't be skipped.
- **A deploy only counts once it's live.** GitHub Actions runs the tests, ships the image, then waits until `/health` reports the new commit and both read APIs return the active story.

## Pipeline

<p align="center">
  <img src="frontend/public/workflow.png" alt="The n8n workflow: news and memory are merged, the agent picks a headline with Gemini or Groq, Flux.1 renders it, and the result is uploaded to Cloudinary and saved to Postgres." width="700" />
</p>

1. **Trigger:** the daily schedule, or the webhook behind "Run Workflow".
2. **Collect:** fetch the latest headlines from NewsAPI and the ten-headline memory from Postgres, and format them for the agent.
3. **Select:** the agent returns one headline and a visual description of at most 20 words, as JSON.
4. **Remember:** add the headline to the memory and drop anything beyond the last ten.
5. **Render:** Flux.1 Schnell generates the image through the Hugging Face Inference API, with Leonardo and then Pollinations as fallbacks.
6. **Store:** upload the image to Cloudinary, save the story to Postgres and keep the last seven.
7. **Publish:** a scheduled run marks the new story active; a webhook run returns it as JSON instead.

<details>
<summary>The agent's prompt</summary>

```
#ROLE
You are an editorial selector for a news-to-art website.

#TASK
Choose ONE impactful, globally relevant news headline from the list below.

#SELECTION CRITERIA
1. Pick the most impactful and globally relevant headline
2. Avoid headlines substantially similar to previously selected ones
3. "Substantially similar" means same event, person, or topic (even if worded differently)
4. If all headlines are similar, choose the least similar option

{{ $json.prompt }}

#OUTPUT FORMAT (STRICT)
Return ONLY a valid JSON object:
{
  "headline": "exact headline text from the numbered list",
  "description": "short visual description, max 20 words, concrete imagery"
}

Do NOT include any other text, markdown, or explanation.
```

`{{ $json.prompt }}` is filled with the previous ten picks and up to 30 current headlines.

</details>

## API

Served at `https://api.jonathan-orlowski.dev`.

| Endpoint | Used by | Returns |
| --- | --- | --- |
| `POST /api/v1/news` | Web app | `{ "getActiveNews": { id, headline, description, image_url } }` |
| `POST /api/v1/graphql` | Android app | `activeNews { id headline description image_url }` |
| `POST /api/v1/workflow` | Web and Android "Run Workflow" | The new story, after a live run (30–60 s). 429 past 3 runs per visitor per hour or 20 a day in total |
| `GET /health` | Deploy smoke test, status badge | `{ "status", "database", "version" }`, with 503 if Postgres is unreachable |

`version` is the commit the image was built from. The database check is cached for five seconds. The container has no Docker `HEALTHCHECK`, because polling the database would keep the Neon free tier from ever suspending.

## Project structure

```
├── backend/                # API (Express, Prisma 7 with the pg driver adapter, graphql-http)
│   ├── src/
│   │   ├── routes/         # REST, GraphQL, workflow proxy and /health
│   │   ├── middleware/     # CORS, rate limits
│   │   └── graphql/        # Schema and resolvers
│   └── test/               # Jest + supertest, with the database mocked
├── frontend/               # Web app (React 19, Vite, Tailwind CSS 4)
│   ├── src/
│   └── public/
│       ├── _headers        # Cloudflare Pages security headers (CSP)
│       ├── gtag-init.js    # Google Analytics bootstrap
│       └── og-image.jpg    # Link preview image
├── mobile/                 # Android app (React Native, Expo 58); the APK is under Releases
├── shared/                 # Types, copy and fetch logic used by both apps
├── docs/                   # README media
├── my-workflow.json        # n8n workflow export, with keys moved to credentials
└── Dockerfile              # API image
```

## Running locally

Requires Node 22.

```bash
# API: needs AGENTIC_AI_DB_URL in backend/.env, plus N8N_WEBHOOK_URL and N8N_WEBHOOK_TOKEN for "Run Workflow"
cd backend
npm ci
npx prisma generate
npm run dev                 # http://localhost:3001

# Web app: reads VITE_BACKEND from .env.development
cd frontend
npm ci
npm run dev
```

To run the workflow yourself, import `my-workflow.json` into n8n and add credentials for Gemini, Groq, Hugging Face, Cloudinary and Postgres, plus three Header Auth credentials: `NewsAPI key` (header `X-Api-Key`), `Leonardo API key` (header `Authorization`, value `Bearer <key>`) and `Workflow token` (header `X-Workflow-Token`, the same value as the API's `N8N_WEBHOOK_TOKEN`).

## Testing

Both apps use Jest.

```bash
cd backend && npm run typecheck && npm test
cd frontend && npm run typecheck && npm run lint && npm test
```

- **API:** the REST and GraphQL responses each app depends on, the workflow proxy and both of its rate limits, the `/health` statuses and cache, and which origins CORS allows.
- **Web app:** loading the stored story, running the workflow, and showing the API's error (such as the rate limit) when a request fails, with `fetch` stubbed.

The `Test` workflow runs both on every push and pull request, and `Build and Deploy` runs it again before shipping.

## Security and maintenance

- **Content Security Policy:** the web app allows scripts only from itself, Google Tag Manager and Cloudflare Web Analytics, images only from Cloudinary, and connections only to the API and analytics. Google Analytics is bootstrapped from a file so that no inline script is needed.
- **Rate limits** protect the free-tier quotas behind "Run Workflow", as described above.
- **CORS:** the API answers browsers only on `jonathan-orlowski.dev` and `agentic-ai-news-to-image.pages.dev`, and returns no stack traces.
- **Branch protection:** `main` takes changes through pull requests, which need the `backend` and `frontend` checks to pass and no high-severity CodeQL alerts.
- **CodeQL** scans the TypeScript and the workflows.
- **Dependabot** opens weekly grouped updates for the API, the web app and the Docker base image, and monthly ones for GitHub Actions. The Expo app gets security updates only, since Expo pins its packages to the SDK.

## Limitations

- A live run takes 30 to 60 seconds on free tiers, mostly image generation.
- "Run Workflow" is limited to 3 runs per visitor per hour and 20 a day overall, and NewsAPI's free plan can run out before that.
- The first request after a quiet spell is slower while Neon wakes up.

## Acknowledgements

n8n for the workflow engine, Black Forest Labs for Flux.1, Hugging Face for hosting it, Leonardo and Pollinations for the fallbacks, and NewsAPI for the headlines.

## Contact

Developed by [Jonathan Orlowski](https://jonathan-orlowski.dev/). Licensed under the Apache License 2.0, see [`LICENSE`](LICENSE).
