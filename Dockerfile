# ── Stage 1: Build the React app ──────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first (layer caching)
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: Serve with Node + Express (handles SPA + /api/contact) ───────────
FROM node:18-alpine AS runner

WORKDIR /app

# Only copy what's needed to run
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/api ./api
COPY --from=builder /app/package*.json ./

# Install only production deps
RUN npm ci --omit=dev --frozen-lockfile

# Copy the production server
COPY serve.js ./

EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080

CMD ["node", "serve.js"]
