# Base image with Node.js
FROM almalinux:8 AS base

# Install Node.js 18 (set up NodeSource repository)
RUN dnf install -y curl && \
  curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
  dnf install -y nodejs && \
  dnf clean all

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy lock files and install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm in the builder stage
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Uncomment to disable Next.js telemetry during the build
# ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm install
RUN pnpm run build

# If using npm, comment out the above and use the below instead
#RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment to disable telemetry during runtime
# ENV NEXT_TELEMETRY_DISABLED 1

RUN groupadd -r nodejs && useradd -r -g nodejs nextjs

USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 15001

ENV PORT=15001
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
