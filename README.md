# DraftSprint

> **Finish your first draft—systematically.**

DraftSprint is a focused writing app designed specifically for beginner novelists to complete their first full-length manuscript. Through habit scaffolding, scene-based structure, and anti-perfectionism mechanics, DraftSprint measurably increases draft completion rates.

## ✨ Features

### Core Writing Experience
- **Distraction-Free Editor** - Minimal UI optimized for long-form writing
- **Write-Forward Mode** - Anti-perfectionism guardrails to prevent endless editing
- **Pomodoro Timer** - 15/25/50 minute focused writing sessions
- **Auto-save** - Never lose your work with continuous background saving

### Structure & Organization
- **Scene-Based Structure** - Organize novels into manageable 1-2k word scenes
- **Project Planning** - Set word count goals and track progress
- **Snowflake Method Lite** - Optional story development framework

### Progress & Motivation
- **Daily Word Goals** - Configurable minimums with streak tracking
- **Progress Visualization** - Charts, calendars, and completion predictions
- **Achievement System** - Milestone badges for motivation
- **Writing Calendar** - Visual heatmap of your writing activity

### Additional Tools
- **Session Notes** - Quick "fix later" annotations without breaking flow
- **Import/Export** - Markdown and DOCX support with manuscript formatting
- **Backup System** - Automatic daily snapshots of your work

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Neon PostgreSQL database
- A Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/draftsprint.git
   cd draftsprint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.local` and fill in your credentials:
   ```bash
   cp .env.local .env.local.example
   ```

   Required variables:
   ```env
   # Database (Neon PostgreSQL)
   DATABASE_URL="postgresql://username:password@host/database"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

DraftSprint uses Drizzle ORM with PostgreSQL. The recommended setup is:

1. **Create a Neon database** at [neon.tech](https://neon.tech)
2. **Copy the connection string** to your `.env.local`
3. **Run migrations** with `npm run db:migrate`

### Database Schema

Key tables include:
- `users` & `profiles` - User accounts and preferences
- `projects` - Novel projects with metadata
- `scenes` & `scene_content` - Story structure and content
- `sessions` - Writing session tracking
- `daily_goals` - Streak and goal tracking
- `achievements` - Milestone badges

## 🔐 Authentication Setup

DraftSprint uses Clerk for user authentication:

1. **Create a Clerk application** at [clerk.com](https://clerk.com)
2. **Copy your keys** to `.env.local`
3. **Configure sign-in/sign-up URLs** (optional)

Clerk handles:
- Email/password authentication
- OAuth providers (Google, GitHub, etc.)
- User management and profiles
- Session security

## 📊 Key Metrics & Goals

DraftSprint is designed to achieve:

- **>60%** - Users complete first guided session within 24h
- **>35%** - Users achieve 14-day writing streak by day 30
- **>10%** - Users complete their first draft by day 90
- **4+ sessions/week** - Median engagement for active users

## 🎯 Product Philosophy

### For Beginner Novelists
- First-time writers need **completion systems**, not editing tools
- **Habit formation** is more important than perfect prose
- **Anti-perfectionism** prevents endless revision cycles

### Evidence-Based Design
- Only ~3% of aspiring novelists finish a first draft
- **76-95%** completion rates are possible with proper scaffolding
- Daily minimums + accountability = measurable results

### Focused Scope
**What DraftSprint Does:**
✅ Habit scaffolding and session structure
✅ Scene-based organization
✅ Progress tracking and motivation
✅ Write-forward anti-perfectionism tools

**What DraftSprint Doesn't Do:**
❌ Deep editorial feedback or AI writing
❌ Community features or critique groups
❌ Publishing business education
❌ Complex plotting tools (beyond basics)

## 🛠️ Development

### Tech Stack
- **Frontend:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Database:** PostgreSQL with Drizzle ORM
- **Auth:** Clerk
- **Hosting:** Vercel (recommended)

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio
```

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── dashboard/       # Main dashboard
│   ├── write/          # Writing session interface
│   ├── onboarding/     # 3-step project setup
│   ├── progress/       # Analytics and streaks
│   └── project/        # Project management
├── components/         # Reusable UI components
│   ├── ui/            # Base components (shadcn/ui)
│   ├── pomodoro-timer.tsx
│   └── writing-editor.tsx
├── lib/               # Utilities and database
│   ├── db/           # Drizzle schema and connection
│   └── utils.ts      # Helper functions
└── middleware.ts     # Clerk authentication
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow the existing component patterns
- Write descriptive commit messages
- Ensure tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Inspired by the [Snowflake Method](https://www.advancedfictionwriting.com/articles/snowflake-method/) by Randy Ingermanson
- UI components powered by [shadcn/ui](https://ui.shadcn.com/)
- Built with [Next.js](https://nextjs.org/) and [Clerk](https://clerk.com/)

---

**Ready to finish your first draft?** [Get started with DraftSprint](http://localhost:3000) and turn your writing dreams into reality.
