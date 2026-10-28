# STAGE 1: The Builder
FROM node:22-slim AS builder
WORKDIR /app

# Copy package files from the backend folder
COPY backend/package*.json ./
RUN npm ci

# Copy all backend code and compile
COPY backend/ .
RUN npm run build 

# STAGE 2: The Final Runner
FROM node:22-slim
WORKDIR /app

# Only copy the compiled files and production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# The deploy passes the commit being built; /health reports it so the smoke test can tell the new container is live.
ARG GIT_SHA=dev
ENV GIT_SHA=$GIT_SHA

# No HEALTHCHECK: /health pings the database, and polling it every 30 seconds would stop the Neon free tier from
# ever suspending. The deploy's smoke test calls it once instead.
EXPOSE 3001
CMD ["node", "dist/app.js"]
