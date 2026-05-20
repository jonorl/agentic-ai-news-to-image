# STAGE 1: The Builder
FROM node:22-slim AS builder
WORKDIR /app

# Copy package files from the backend folder
COPY backend/package*.json ./
RUN npm install

# Copy all backend code and compile
COPY backend/ .
RUN npm run build 

# STAGE 2: The Final Runner
FROM node:22-slim
WORKDIR /app

# Only copy the compiled files and production dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --production

# IMPORTANT: Adjust this path to wherever your compiled files land (usually /dist)
COPY --from=builder /app/dist ./dist

# Run the compiled JS file
EXPOSE 3001
CMD ["node", "dist/app.js"]
