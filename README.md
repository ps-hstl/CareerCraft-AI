<div align="center">

# CareerCraft AI

### AI-Powered Resume Tailoring Platform

![Version](https://img.shields.io/badge/Version-1.0.0-FFF?labelColor=f0fdf4&style=for-the-badge&color=7c3aed)
![License](https://img.shields.io/badge/License-Apache%202.0-FFF?labelColor=f0fdf4&style=for-the-badge&color=059669)
![Stack](https://img.shields.io/badge/Stack-Next.js%20%2B%20FastAPI-FFF?labelColor=f0fdf4&style=for-the-badge&color=7c3aed)

**Craft the perfect resume for every opportunity — powered by AI**

[Launch App](#quick-start) · [Features](#features) · [Install](#how-to-install) · [Contributing](#contributing)

</div>

---

> **Based on** [Resume Matcher](https://github.com/srbhr/Resume-Matcher) by [@srbhr](https://github.com/srbhr) (Apache 2.0).
> CareerCraft AI is a fork with a refreshed UI, dark mode, and a keyword Match Score feature.

---

## What Is CareerCraft AI?

CareerCraft AI helps you **tailor your resume to every job description** using AI-powered suggestions. Upload your master resume once, paste any job description, and get a tailored resume — with a keyword match score — in seconds.

Works locally with **Ollama** (free, private) or connects to **OpenAI, Anthropic, Google Gemini**, and more.

---

## What's New in This Fork

| Change | Details |
|---|---|
| 🎨 **New Color Palette** | Emerald + Violet theme replaces the original blue/black Swiss palette. Full dark mode support. |
| 🌙 **Dark Mode Toggle** | One-click dark/light mode switch — persisted across sessions via `localStorage`. |
| 📊 **Keyword Match Score** | Every tailored resume card shows a circular match-score badge (0–100%) computed from keyword overlap with the job description. |
| ✏️ **Renamed Project** | "Resume Matcher" → "CareerCraft AI" — fresh branding throughout. |

---

## Features

### Core

- **Upload** your master resume (PDF or DOCX)
- **Paste** a job description you're targeting
- **Review** AI-generated tailored content and suggestions
- **Cover Letter & Email** generator for each application
- **Drag-and-drop** section reordering in the Resume Builder
- **Export** as a professional PDF (4 templates included)

### Extra Features (This Fork)

#### 🌙 Dark Mode
Toggle between light (Emerald Canvas) and dark (Deep Navy) themes. The preference is saved to `localStorage` so it persists across page loads.

```tsx
// components/home/hero.tsx — DarkModeToggle
<button onClick={toggle}>
  {dark ? '☀ Light' : '☾ Dark'}
</button>
```

#### 📊 Keyword Match Score Badge
Each tailored resume card displays a circular progress badge showing how well your resume's keywords match the job description. Scores are color-coded:

| Score | Color | Meaning |
|---|---|---|
| 75–100% | 🟢 Emerald | Strong match |
| 50–74% | 🟣 Violet | Good match |
| 25–49% | 🟡 Amber | Moderate match |
| 0–24% | 🔴 Red | Needs improvement |

```tsx
// Usage in dashboard cards
<MatchScoreBadge resumeText={resume.content} jobDescription={jd} />
```

---

## How to Install

### Prerequisites

| Tool | Version |
|---|---|
| Python | 3.13+ |
| Node.js | 22+ |
| uv | Latest |

### Quick Start

```bash
# Clone your fork
git clone https://github.com/your-username/careercraft-ai.git
cd careercraft-ai

# Backend (Terminal 1)
cd apps/backend
cp .env.example .env        # Add your AI provider key
uv sync
uv run uvicorn app.main:app --reload --port 8000

# Frontend (Terminal 2)
cd apps/frontend
npm install
npm run dev
```

Open **http://localhost:3000** and configure your AI provider in Settings.

### Supported AI Providers

| Provider | Type | Notes |
|---|---|---|
| **Ollama** | Local | Free, runs on your machine |
| **OpenAI** | Cloud | GPT-4o, GPT-4o-mini |
| **Anthropic** | Cloud | Claude 3.5 Sonnet |
| **Google Gemini** | Cloud | Gemini 1.5 Flash/Pro |
| **OpenRouter** | Cloud | Multiple model access |
| **DeepSeek** | Cloud | DeepSeek Chat |

### Docker

```bash
docker run --name careercraft-ai \
  -p 3000:3000 \
  -v careercraft-data:/app/backend/data \
  ghcr.io/srbhr/resume-matcher:latest
```

*(Uses upstream Docker image; rebuild with your changes for custom deployments)*

---

## Tech Stack

| Component | Technology |
|---|---|
| Backend | FastAPI, Python 3.13+, LiteLLM |
| Frontend | Next.js 15, React 19, TypeScript |
| Database | TinyDB (JSON) |
| Styling | Tailwind CSS 4, Custom Emerald/Violet theme |
| PDF | Headless Chromium via Playwright |

---

## Resume Templates

| Template | Description |
|---|---|
| Classic Single Column | Traditional clean layout |
| Modern Single Column | Contemporary, readability-focused |
| Classic Two Column | Structured two-column layout |
| Modern Two Column | Sleek two-column design |


