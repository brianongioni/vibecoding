# RoomBook — Conference Room Booking MVP

Book conference rooms instantly. Built with Next.js, Prisma, NextAuth, Stripe, and Tailwind CSS.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Auth | NextAuth.js v4 (credentials) |
| Payments | Stripe |
| CI | GitHub Actions |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or hosted)

### Setup

```bash
# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.example .env

# Push the schema to your database
npm run db:push

# Seed the database with demo data
npm run db:seed

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Accounts (after seeding)

| Role | Email | Password |
|---|---|---|
| Owner | owner@example.com | password123 |
| Booker | booker@example.com | password123 |

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | App URL (`http://localhost:3000` for dev) |
| `NEXTAUTH_SECRET` | Random secret for NextAuth sessions |
| `STRIPE_SECRET_KEY` | Stripe secret key (test mode) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (test mode) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with demo data |
| `npm run db:studio` | Open Prisma Studio |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth API routes
│   │   ├── auth/signup/          # User registration
│   │   └── payments/             # Stripe payment intents
│   ├── auth/
│   │   ├── signin/               # Sign in page
│   │   └── signup/               # Sign up page
│   ├── dashboard/
│   │   ├── booker/               # Booker dashboard (auth-gated)
│   │   └── owner/                # Owner dashboard (auth-gated)
│   ├── rooms/[id]/               # Room detail page
│   ├── search/                   # Room search page
│   ├── loading.tsx               # Global loading state
│   ├── not-found.tsx             # 404 page
│   └── page.tsx                  # Home / landing page
├── components/
│   ├── Navbar.tsx                # Responsive navigation bar
│   └── Providers.tsx             # Session provider wrapper
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client singleton
│   └── stripe.ts                 # Stripe client (lazy-loaded)
├── middleware.ts                  # Auth middleware (protects /dashboard/*)
└── types/
    ├── index.ts                  # Shared types (User, Room, Booking, Payment)
    └── next-auth.d.ts            # NextAuth type extensions
prisma/
├── schema.prisma                 # Database schema
└── seed.ts                       # Development seed data
.github/
└── workflows/ci.yml              # CI pipeline (lint + type-check + build)
```

## Pages

| Route | Description | Auth Required |
|---|---|---|
| `/` | Landing page | No |
| `/search` | Browse and search rooms | No |
| `/rooms/[id]` | Room detail with booking form | No |
| `/auth/signin` | Sign in | No |
| `/auth/signup` | Sign up (booker or owner) | No |
| `/dashboard/booker` | View your bookings | Yes |
| `/dashboard/owner` | Manage your listed rooms | Yes |
