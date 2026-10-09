# AIVAR
**AI-Powered Requirements Engineering & Software Architecture Intelligence Platform**

AIVAR is a comprehensive Software Requirement Specification (SRS) intelligence platform. It analyzes SRS documents using Google Gemini, transforming unstructured text into structured, validated, traceable, and architecturally useful requirements.

## Overview
AIVAR acts as your AI-powered engineering partner. Instead of manually parsing 100-page SRS documents, AIVAR extracts the requirements, scores them based on IEEE standards, detects internal conflicts, flags ambiguities, auto-generates architectural diagrams (UML, Context Flow), and proposes testing scenarios.

## Features
- **Document Processing**: Upload PDF/DOCX and extract structured text.
- **AI Requirement Extraction Engine**: Transforms unstructured text into structured requirements with priorities, types, and scores.
- **Contextual Conflict Detection**: Identifies logical contradictions across your entire SRS document.
- **Ambiguity & Risk Analysis**: Flags vague language and estimates requirement risk based on complexity and completeness.
- **Auto-Architecture Generation**: Gemini analyzes requirements to generate System Architecture, UML, and Data Flow diagrams using Mermaid.js.
- **Test Case Generation**: Derives positive, negative, and edge-case testing scenarios from functional requirements.
- **Interactive Dashboard**: Track SRS quality, conflicts, test coverage, and architecture.
- **"Chat with your SRS" Copilot**: Ask Gemini questions specifically grounded in your uploaded SRS.

## Architecture
- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, shadcn/ui.
- **Backend**: Next.js Route Handlers and Server Actions (Vercel Serverless/Edge compatible).
- **Database**: PostgreSQL (via Supabase) with Prisma ORM.
- **AI Engine**: Google Gemini API (gemini-2.5-flash / gemini-2.5-pro).
- **Deployment**: Vercel.

## Tech Stack
- Next.js 15
- TypeScript
- Prisma ORM
- Supabase (Auth + DB)
- Google Gen AI SDK
- Tailwind CSS & shadcn/ui
- Mermaid.js
- Lucide Icons

## Project Structure
```text
aivar/
├── src/
│   ├── app/
│   │   ├── (auth)/        # Login / Register
│   │   ├── dashboard/     # Main Application Shell & Views
│   │   ├── api/           # Next.js Route Handlers
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/            # shadcn/ui generic components
│   │   ├── architecture/  # Mermaid Diagram component
│   │   └── ...
│   ├── lib/
│   │   ├── ai/            # Gemini Prompt architecture
│   │   ├── db/            # Prisma Client
│   │   └── supabase/      # Supabase SSR Clients
│   └── middleware.ts      # Route Protection
├── prisma/
│   └── schema.prisma      # DB Schema
├── scripts/
│   └── seed.ts            # Local demo seeder
└── ...
```

## Environment Variables
Create a `.env` or `.env.local` file:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Prisma Database connection strings (PostgreSQL via Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@[DB_HOST]:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[DB_HOST]:5432/postgres"
```

## Local Development
1. Clone or initialize the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`.
4. Migrate the database:
   ```bash
   npm run db:migrate
   ```
5. Seed demo data (optional):
   ```bash
   npm run db:seed
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup
AIVAR uses Prisma. 
- During testing, the `prisma/schema.prisma` is pre-configured for PostgreSQL.
- Run `npm run db:migrate` (which maps to `npx prisma migrate dev`) to push the schema to Supabase PostgreSQL.
- Run `npm run db:seed` (which maps to `npx tsx scripts/seed.ts`) to inject the demo `E-Commerce Platform Redesign` project.

## Gemini Setup
1. Obtain an API key from Google AI Studio.
2. Add `GEMINI_API_KEY` to your environment variables.
3. The application uses `gemini-2.5-flash` for extraction and `gemini-2.5-pro` for complex architecture modeling.

## Vercel Deployment
AIVAR is designed to be 100% compatible with Vercel Serverless limits.
1. Authenticate with Vercel:
   ```bash
   vercel login
   ```
2. Link your project:
   ```bash
   vercel link
   ```
3. Push your environment variables to Vercel (or configure in dashboard):
   ```bash
   vercel env pull
   ```
4. Deploy:
   ```bash
   vercel deploy --prod
   ```
*(Ensure `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, etc., are configured in your Vercel Project Settings).*

## Security
- SRS documents are considered **untrusted input**. The Gemini prompts feature explicit prompt-injection protection (separating `SYSTEM INSTRUCTIONS` from `UNTRUSTED DOCUMENT CONTENT`).
- No AI findings are directly executed or embedded as raw HTML. Mermaid diagrams are sandboxed using `securityLevel: 'loose'` cautiously only for known tags.
- Row Level Security (RLS) is expected to be configured on the Supabase side for PostgreSQL.

## Known Limitations
- Vercel Serverless Functions have a timeout (10s on Hobby, 60s on Pro). Very large SRS documents (e.g., 300+ pages) may hit serverless timeouts when parsing through Gemini in a single blocking API request. A background worker architecture (using Upstash/QStash or Inngest) is recommended for Enterprise deployments.
- Auto-Architecture generation can sometimes produce malformed Mermaid syntax. A fallback parsing strategy or retry logic is recommended.
- PDF parsing relies on text-extraction quality. Scanned PDFs without OCR will yield poor results.
