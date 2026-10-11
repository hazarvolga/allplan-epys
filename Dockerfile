FROM node:24-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.17.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
FROM deps AS builder
COPY . .
ARG ALLOW_AI_CRAWLERS=true
ARG NEXT_PUBLIC_PUBLISHER=Aluplan
ARG NEXT_PUBLIC_AFFILIATION
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_CONTENT_AUTHOR
ARG NEXT_PUBLIC_CONTENT_REVIEWER
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=builder --chown=app:app /app/.next/standalone ./
COPY --from=builder --chown=app:app /app/.next/static ./.next/static
COPY --from=builder --chown=app:app /app/public ./public
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD node -e "fetch('http://127.0.0.1:3000/tr').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node","server.js"]
