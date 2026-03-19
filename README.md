unilink is a Next.js application with Prisma + PostgreSQL, NextAuth authentication, and integrations for Google OAuth, LemonSqueezy, Resend, and UploadThing.

<img width="2400" height="1321" alt="Banner" src="https://github.com/user-attachments/assets/7eee6fa3-894a-46fe-a460-c53ad14d22b9" />

## Tech Stack
- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth (5 beta)
- Tailwind CSS 4
- MUI + Recharts for UI/analytics

## Prerequisites
- Node.js 20+ (recommended: latest LTS)
- npm 10+
- PostgreSQL instance (local or hosted)

## Project Setup
```
# 1) Clone
git clone <your-repo-url>
cd unilink

# 2) Install dependencies
npm install
```

## Environment Variables
Create a root .env file:
```
# required
DATABASE_URL="postgresql://postgres:1234@localhost:5432/unilink"
NEXTAUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

LEMONSQUEEZY_API_KEY=""
LEMONSQUEEZY_STORE_ID=""
LEMONSQUEEZY_PRODUCT_ID=""
LEMONSQUEEZY_WEBHOOK_SECRET=""
WEBHOOK_URL="https://your-domain.com/api/webhooks/lemonsqueezy"

RESEND_API_KEY=""
EMAIL_FROM="noreply@your-domain.com"

UPLOADTHING_TOKEN=""

# required in production, optional in development
NEXTAUTH_SECRET=""
```

### Notes:
- NEXTAUTH_SECRET is optional in development but required in production.
- NEXTAUTH_URL must be a valid URL in local/dev (for example http://localhost:3000).

## Database Setup
```
# apply migrations in development
npm run db:generate

# optional: inspect database
npm run db:studio
```

### Alternative database commands:
```
# push Prisma schema without migrations
npm run db:push

# apply existing migrations in deployment
npm run db:migrate
```

## Run the app
```
npm run dev
```
Default local URL: `http://localhost:3000`

## Available Scripts
- npm run dev — start development server
- npm run build — build production bundle
- npm run start — run production server
- npm run db:generate — create/apply Prisma migration in dev
- npm run db:migrate — apply Prisma migrations in deploy/prod
- npm run db:push — sync schema to database (no migration files)
- npm run db:studio — open Prisma Studio
