# Stratix AI — Architectural Strategic Intelligence 🛡️✨

**Stratix AI** is a premium B2B SaaS platform designed to automate high-ticket sales and customer interaction through elite artificial intelligence. Built for scale, it integrates seamlessly with WhatsApp, Instagram, and Web widgets using the proprietary **Opal Logic** decision engine.

---

## 🌟 Key Pillars

### 1. Opal Logic (The Brain)
A multimodal decision engine that doesn't just "chat," but **qualifies** leads. It analyzes user intent (Hot/Warm/Cold), scores potential impact, and handles high-ticket sales flows with surgical precision.

### 2. RAG Engine (The Knowledge)
Retrieval-Augmented Generation at its finest. Upload PDFs, crawl entire websites, or paste raw text. Stratix uses **Supabase Vector (`pgvector`)** and **Gemini Embeddings** to give your bots a photographic memory of your business.

### 3. Multi-Channel Elite
- **WhatsApp Cloud API**: Official integration for professional scale.
- **Dynamic Web Widget**: A beautiful, translucent UI that adapts to any website.
- **Instagram (Coming Soon)**: Unified logic across all social touchpoints.

### 4. Analytical Dashboard
- **Pipeline Temperature**: Real-time visualization of lead quality.
- **Message Quotas**: Built-in protection and usage monitoring for B2B accounts.
- **Export Power**: One-click CSV export for CRM synchronization (Salesforce, HubSpot, etc.).

---

## 🛠️ Technology Stack
- **Frontend**: Next.js 15 (App Router), Framer Motion, Recharts.
- **Backend**: Supabase (Auth, DB, Vector Storage, Real-time).
- **AI Core**: Google Gemini 1.5 Pro / Flash.
- **Payments**: Mercado Pago (Local/Global gateway support).
- **Notifications**: Resend (Elite HTML Transactional Emails).

---

## 🚀 Getting Started

### 1. Local Development
```bash
npm install
npm run dev
```

### 2. Required Environment Variables (.env.local)
```bash
# Core
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# AI
GOOGLE_GEMINI_API_KEY=...

# Payments & Mailing
MP_ACCESS_TOKEN=...
RESEND_API_KEY=...

# App Config
NOTIFICATION_EMAIL=admin@stratix-intelligence.ai
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup (Supabase)
Run the migration files located in `/supabase/migrations/` in order:
1. `initial_schema.sql`
2. `leads_schema.sql`
3. `rag_engine.sql`
4. `email_alerts.sql`

---

## 💎 Elite Features
- **Fingerprinting**: Persistent user sessions across page reloads.
- **Email Alerts**: Real-time notifications for "Hot Leads" directly to your inbox.
- **Currency Toggle**: Native support for COP and USD in pricing.
- **Usage Guards**: Automatic quota enforcement per plan (Free/Starter/Pro).

---

## ✒️ License
Stratix AI — Architectural Strategic Intelligence. 
Cartagena, CO | 2026.
