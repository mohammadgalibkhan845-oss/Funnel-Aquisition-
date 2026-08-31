# NexLeads — Coach Client Acquisition OS

> High-Ticket Client Acquisition Infrastructure for Coaches ($1,000–$10,000+)

Built on the **MERN** stack (React + Vite + TailwindCSS + Express.js + Node.js + MongoDB Dual Engine).

---

## 🚀 Key Features

1. **5-Pillar Diagnostic Funnel Engine**:
   - Scores coaching funnels across *Traffic, Lead Capture, Nurturing, Frictionless Booking, and Follow-Up*.
   - Calculates monthly leaked revenue based on live unit economics.

2. **2-Step Qualification & Strategy Booking**:
   - Timezone-converting live calendar integration with 1-click Google Calendar sync.

3. **Agency Kanban CRM & Prospect Pipeline**:
   - 8-Stage visual Kanban board: *Researched → Outreach Sent → Audit Done → Call Booked → Proposal Sent → Closed Won*.
   - Comprehensive Section 5 prospect dossiers & interaction logs.

4. **Automated Multi-Touch Follow-Up (Day 0–7)**:
   - Dynamic email and SMS simulator with coach-specific token substitution.

5. **4-Part Cold Outreach Studio**:
   - Generates tailored outreach pitches (*Observation → Problem → Opportunity → CTA*) for Instagram, LinkedIn, and Cold Email.

6. **Interactive Draggable AI Chatbot**:
   - Movable AI acquisition strategist assistant across all pages.

7. **Dedicated Service Models & Who We Are**:
   - Done-For-You (DFY), Done-With-You (DWY), and Do-It-Yourself (DIY) frameworks.
   - Founded by **Mohammad Galib Khan**.

---

## 🛠️ Quick Start

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
# Server runs on http://127.0.0.1:5000
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

---

## 🔒 Security Hardening
- **Rate Limiting**: Custom sliding-window rate limiting on Auth, Audit, and Booking endpoints.
- **Defensive Headers**: `nosniff`, `SAMEORIGIN`, `1; mode=block`, and `X-Powered-By` removal.
- **Input Sanitization**: Recursive XSS and prototype pollution filtering.
- **Payload Constraints**: Strict 1MB JSON limits.
- **React Error Boundary**: Crash-proof client error containment.

---

## 📄 License
MIT © 2026 NexLeads Acquisition Systems
