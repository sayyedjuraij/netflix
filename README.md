# StreamNavigator — AI-Powered Free Streaming Discovery

StreamNavigator is a **production-ready**, fully free web application that helps users discover free, legal streaming content available in their country using AI-powered recommendations. Built with Next.js 15, TypeScript, Tailwind CSS, Prisma, Supabase, and OpenRouter.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-5.20-2D3748?logo=prisma)
![Vercel](https://img.shields.io/badge/Vercel-Free-black?logo=vercel)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-purple)

## Features

- **AI Streaming Assistant** — Natural language search powered by free LLMs via OpenRouter
- **Country-Specific Discovery** — Content availability filtered by 16+ countries
- **Mood Explorer** — Match recommendations to your current vibe (Chill, Thrilling, Romantic, etc.)
- **Genre Recommendations** — Multi-genre filtering with up to 3 selections
- **Hidden Gems** — AI-curated underrated and cult classic discoveries
- **Trending Content** — Real-time trending content by region
- **Personal Watchlist** — Save, track, and mark watched status
- **Recommendation History** — Logged AI searches for logged-in users
- **Dark/Light Mode** — Full theme support with system preference detection
- **Glassmorphism UI** — Premium Netflix + Apple TV-inspired design
- **Fully Responsive** — Optimized for mobile, tablet, and desktop
- **SEO Optimized** — Meta tags, OpenGraph, structured data ready
- **Accessibility First** — ARIA labels, keyboard navigation, focus states
- **Performance Tuned** — Dynamic imports, lazy loading, skeleton loaders, 90+ Lighthouse target

## Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Framework | Next.js 15 (App Router) | Free |
| Language | TypeScript | Free |
| Styling | Tailwind CSS + Custom CSS Variables | Free |
| UI Components | Custom ShadCN-inspired | Free |
| Animations | Framer Motion | Free |
| Database | PostgreSQL (Supabase Free Tier) | Free |
| ORM | Prisma | Free |
| Auth | NextAuth.js v5 (Auth.js) | Free |
| AI | OpenRouter (Free Models) | Free |
| Hosting | Vercel Free Tier | Free |
| Analytics | Vercel Analytics + Speed Insights | Free |

## Complete Folder Structure

```
streamnavigator/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/   # Auth.js endpoint
│   │   ├── recommendations/      # AI recommendation engine
│   │   ├── trending/             # Trending content by region
│   │   ├── watchlist/            # Watchlist CRUD
│   │   └── settings/             # Profile & preferences API
│   ├── (auth)/                   # Auth group (optional)
│   ├── login/                    # Login page (OAuth)
│   ├── register/                 # Redirect to login
│   ├── dashboard/                # User dashboard
│   ├── discover/                 # AI discovery with assistant
│   ├── trending/                 # Trending content page
│   ├── hidden-gems/              # Hidden gems explorer
│   ├── mood/                     # Mood-based recommendations
│   ├── watchlist/                # Saved watchlist
│   ├── settings/                 # User settings & preferences
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout + providers
│   └── globals.css               # Global styles + Tailwind
├── components/
│   ├── layout/                   # Navbar, ThemeProvider, Providers
│   ├── streaming/                # ContentCard, ContentGrid
│   ├── ai/                       # AISearchAssistant
│   └── ui/                       # Reusable UI primitives
├── lib/                          # Core utilities
│   ├── auth.ts                   # Auth.js configuration
│   ├── prisma.ts                 # Prisma client singleton
│   ├── openrouter.ts             # OpenRouter AI client
│   └── utils.ts                  # Helpers, countries, genres, moods
├── prisma/
│   ├── schema.prisma             # Full database schema
│   └── seed.ts                   # Seed trending data
├── types/
│   └── index.ts                  # TypeScript interfaces
├── public/                       # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD pipeline
├── Dockerfile                    # Container setup
├── vercel.json                   # Vercel configuration
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind + custom theme
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
├── .env.example                  # Environment template
└── .gitignore
```

## Quick Start Guide

### 1. Prerequisites

You need:
- **Node.js 20+** ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **A code editor** (VS Code recommended)
- **A free Supabase account** ([Sign up](https://supabase.com/))
- **A free OpenRouter account** ([Sign up](https://openrouter.ai/))
- **A free Vercel account** ([Sign up](https://vercel.com/))
- **A free GitHub account** ([Sign up](https://github.com/))

### 2. Clone & Install

Open your terminal and run:

```bash
# Clone the repository
git clone https://github.com/yourusername/streamnavigator.git
cd streamnavigator

# Install dependencies
npm install
```

### 3. Set Up Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your real values:

```env
# ── Database ───────────────────────────────
# Supabase → Project Settings → Database → Connection String
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres?schema=public"
DIRECT_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres?schema=public"

# ── Auth ─────────────────────────────────
# Generate a random string: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
AUTH_SECRET="your_random_base64_string"
AUTH_URL="http://localhost:3000"

# GitHub OAuth (optional but recommended)
# GitHub → Settings → Developer Settings → OAuth Apps → New
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google OAuth (optional)
# Google Cloud Console → APIs & Services → Credentials → Create OAuth 2.0
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# ── AI (OpenRouter) ──────────────────────
# OpenRouter → Keys → Create Key
OPENROUTER_API_KEY="sk-or-v1-your-openrouter-key"
# See "Free AI Models" section below for recommended models
OPENROUTER_MODEL="openai/gpt-3.5-turbo"

# ── App Config ───────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="StreamNavigator"
```

### 4. Initialize the Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase (creates tables)
npx prisma db push

# Seed sample trending data
npx prisma db seed
```

> **Note:** `prisma db push` is great for prototyping. For production, use `prisma migrate deploy` after generating your first migration with `npx prisma migrate dev --name init`.

### 5. Run the App Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `streamnavigator`
3. Make it **Public** (required for Vercel free hobby plan)
4. Do **not** initialize with a README (we already have one)
5. Click **Create repository**

Back in your terminal:

```bash
# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial StreamNavigator production build"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/streamnavigator.git

# Push
git branch -M main
git push -u origin main
```

### 7. Connect to Vercel & Deploy

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `streamnavigator` GitHub repository
3. Vercel will auto-detect Next.js
4. **Add Environment Variables** — copy every key from your `.env` file into Vercel's environment variable UI
5. Click **Deploy**

Vercel will build and deploy your app in ~2 minutes. You'll get a free `.vercel.app` domain.

### 8. Configure Your Domain (Optional)

In Vercel Dashboard → Project → Settings → Domains:
- Add your custom domain or use the free Vercel domain

### 9. Set Up GitHub Actions (Auto-Deploy)

1. In Vercel Dashboard → Project → Settings → Git → **Disconnect** (we'll use GitHub Actions for more control)
2. Get your Vercel tokens:
   - `VERCEL_TOKEN`: Vercel Account → Settings → Tokens
   - `VERCEL_ORG_ID`: From `.vercel/project.json` after running `vercel link` locally, or from your Vercel dashboard URL
   - `VERCEL_PROJECT_ID`: Same as above
3. Add these 3 secrets to GitHub:
   - Repo → Settings → Secrets and variables → Actions → **New repository secret**

Every push to `main` will now automatically run tests and deploy.

## Using Free AI Models Through OpenRouter

StreamNavigator uses **OpenRouter** to access free and low-cost LLMs. You don't need to pay for OpenAI or Anthropic directly.

### Recommended Free Models

Update `OPENROUTER_MODEL` in your `.env` to any of these:

| Model | ID | Notes |
|-------|-----|-------|
| Mistral 7B | `mistralai/mistral-7b-instruct:free` | Fast, good for simple queries |
| Llama 3 8B | `meta-llama/llama-3-8b-instruct:free` | Excellent quality, free tier available |
| Qwen 2.5 | `qwen/qwen-2.5-7b-instruct:free` | Great for structured JSON output |
| Google Gemma | `google/gemma-2-9b-it:free` | Lightweight, fast responses |
| DeepSeek V3 | `deepseek/deepseek-chat:free` | Very capable free model |

### How to Switch Models

1. Go to [openrouter.ai/models](https://openrouter.ai/models)
2. Filter by **Free**
3. Copy the model ID
4. Update `OPENROUTER_MODEL` in your `.env` and Vercel environment variables
5. Redeploy

### Rate Limits & Caching

- Free tier: Typically 20 requests/minute per model
- StreamNavigator includes **in-memory rate limiting** (10 requests/minute per user/IP)
- For production, switch to Redis or Upstash for distributed rate limiting

## Authentication Setup

StreamNavigator uses **NextAuth.js v5 (Auth.js)** with Prisma Adapter.

### GitHub OAuth (Easiest)

1. GitHub → Settings → Developer Settings → **OAuth Apps** → **New OAuth App**
2. Application name: `StreamNavigator`
3. Homepage URL: `https://your-app.vercel.app`
4. Authorization callback URL: `https://your-app.vercel.app/api/auth/callback/github`
5. Save **Client ID** and **Client Secret** to your `.env` and Vercel

### Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Create **OAuth 2.0 Client ID** (Web application)
3. Authorized redirect URI: `https://your-app.vercel.app/api/auth/callback/google`
4. Save credentials to your `.env` and Vercel

## Database Schema

### Prisma Models

- **User** — Core user account (managed by Auth.js)
- **Account** — OAuth account linking
- **Session** — Active sessions
- **Profile** — Extended user profile (country, bio, avatar)
- **Preferences** — User settings (genres, dark mode, region, notifications)
- **WatchlistItem** — Saved content with watched status and notes
- **SavedSearch** — Persisted AI search queries
- **RecommendationHistory** — Log of all AI recommendation requests
- **TrendingContent** — Cached trending titles by country

### Run Migrations

```bash
# Development: create and apply migration
npx prisma migrate dev --name descriptive_name

# Production: apply pending migrations
npx prisma migrate deploy

# Open database GUI
npx prisma studio
```

## API Routes

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/auth/[...nextauth]` | ALL | No | Authentication endpoints |
| `/api/recommendations` | POST | Optional | AI-powered content discovery |
| `/api/recommendations` | GET | Yes | User recommendation history |
| `/api/trending` | GET | No | Trending content by country |
| `/api/watchlist` | GET | Yes | User watchlist |
| `/api/watchlist` | POST | Yes | Add to watchlist |
| `/api/watchlist` | PATCH | Yes | Update watchlist item |
| `/api/watchlist` | DELETE | Yes | Remove from watchlist |
| `/api/settings` | GET | Yes | Profile & preferences |
| `/api/settings` | PATCH | Yes | Update profile & preferences |

## Security & Performance

### Implemented

- **Protected Routes** — Middleware checks auth status for /dashboard, /watchlist, /settings
- **API Protection** — All write routes require valid session
- **Input Sanitization** — Zod validation on all API endpoints
- **Rate Limiting** — 10 requests/minute per IP (in-memory, upgrade to Redis for scale)
- **Environment Variables** — All secrets externalized, never committed
- **SQL Injection Prevention** — Prisma ORM parameterized queries
- **XSS Prevention** — React escapes output by default
- **CSRF Protection** — Handled by NextAuth.js
- **Lazy Loading** — Components load on demand with dynamic imports
- **Skeleton Loaders** — Shimmer effects for loading states
- **Image Optimization** — Lazy loading with blur placeholders
- **SEO** — Meta tags, OpenGraph, Twitter cards, structured JSON-LD ready

## Customization Guide

### Adding a New Country

Edit `lib/utils.ts`:

```typescript
export const countries = [
  // ...existing countries
  { code: "IT", name: "Italy", flag: "🇮🇹" },
];
```

Update `prisma/seed.ts` and redeploy.

### Adding a New Genre

Edit the `genres` array in `lib/utils.ts`.

### Adding a Free Platform

Edit `freePlatforms` in `lib/utils.ts`:

```typescript
{ name: "MyNewPlatform", url: "https://example.com", regions: ["US", "CA"] }
```

### Changing the AI Model

Update `OPENROUTER_MODEL` environment variable to any model ID from [openrouter.ai/models](https://openrouter.ai/models).

## Troubleshooting

### Build fails with Prisma errors
```bash
npx prisma generate
npx prisma db push
```

### Auth callback errors
- Double-check your `AUTH_SECRET` is set and at least 32 characters
- Verify OAuth callback URLs match your deployment URL exactly (including `https://`)
- Ensure `AUTH_URL` matches your production domain in Vercel environment variables

### Database connection errors
- Verify `DATABASE_URL` and `DIRECT_URL` are correct
- Ensure Supabase project is active (not paused)
- Check IP allowlist in Supabase (if using IPv4 restrictions, use connection pooler)

### OpenRouter "Rate Limit Exceeded"
- Switch to a different free model ID
- Wait 1 minute (built-in rate limiting)
- Upgrade to a paid OpenRouter key for higher limits

### Images not loading
- Images use `unoptimized: true` in Next.js config for maximum compatibility
- For production, configure your own image domains in `next.config.ts`

## Deployment Checklist

- [ ] Set all environment variables in Vercel
- [ ] Run `npx prisma migrate deploy` on production database
- [ ] Configure OAuth callback URLs for production domain
- [ ] Generate a strong `AUTH_SECRET` (not the same as local)
- [ ] Set `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Enable Vercel Analytics (optional, free)
- [ ] Add custom domain (optional)
- [ ] Test login flow
- [ ] Test AI recommendation flow
- [ ] Test watchlist add/remove
- [ ] Run Lighthouse audit (target: 90+)

## License

MIT — free for personal and commercial use.

## Contributing

Contributions welcome! This is built as a real-world production starter. Please open issues for bugs or feature requests.

## Credits

Built with Next.js, Tailwind CSS, Prisma, Supabase, Auth.js, Framer Motion, and OpenRouter.

---

**Questions?** Open an issue on GitHub or reach out on Twitter/X.
