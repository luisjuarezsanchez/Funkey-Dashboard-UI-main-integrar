FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

ENV NEXT_PUBLIC_AUTH0_SECRET=tk56SSrLwfKXDFOzBCAY_mK42FHrDxLCp3HT4NAtH5uzXy0yGH1U2j609ohXw8Ld        
ENV NEXT_PUBLIC_AUTH0_BASE_URL=http://k8s-teamcoco-dashboar-238b55d2b8-642462416.us-east-2.elb.amazonaws.com/
ENV NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL=dev-codice-azul.us.auth0.com
ENV NEXT_PUBLIC_AUTH0_CLIENT_ID=e2SeCuloNSj4nNiYJJ5NGIamPsgB1Dw0
ENV NEXT_PUBLIC_AUTH0_AUDIENCE=https://dev-codice-azul.us.auth0.com/api/v2/
ENV NEXT_PUBLIC_BFF_URL=http://k8s-cocolab-7dc852397d-263568136.us-east-2.elb.amazonaws.com
ENV NEXT_PUBLIC_AUTH0_LOGOUT_URL=http://k8s-teamcoco-dashboar-238b55d2b8-642462416.us-east-2.elb.amazonaws.com/dashboard

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]