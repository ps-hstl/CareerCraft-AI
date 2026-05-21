'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from '@/lib/i18n';

// ── Extra Feature #1: Dark Mode Toggle ──────────────────────────────────────
import { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('careercraft-theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('careercraft-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('careercraft-theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 border border-border bg-background text-foreground px-3 py-1.5 font-mono text-xs font-bold uppercase shadow-sw-sm hover:shadow-sw-default hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {dark ? '☀ Light' : '☾ Dark'}
    </button>
  );
}
// ───────────────────────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useTranslations();

  const buttonClass =
    'group relative border border-border bg-transparent px-8 py-3 font-mono text-sm font-bold uppercase text-primary transition-[transform,box-shadow,background-color,color] duration-150 ease-out hover:bg-primary hover:text-primary-foreground hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-sw-default active:translate-x-0 active:translate-y-0 active:shadow-none cursor-pointer';

  return (
    <>
      <DarkModeToggle />
      <section
        className="h-screen w-full p-4 md:p-12 lg:p-24 bg-background"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124, 58, 237, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center border border-border text-primary bg-background shadow-sw-xl">
          {/* Brand badge */}
          <div className="mb-6 border border-primary/40 bg-primary/10 px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest text-primary">
            ✦ AI-Powered Resume Platform ✦
          </div>

          <h1 className="mb-4 text-center font-mono text-6xl font-bold uppercase leading-none tracking-tighter md:text-8xl lg:text-9xl selection:bg-primary selection:text-primary-foreground">
            {t('home.brandLine1')}
            <br />
            <span className="text-[#059669]">{t('home.brandLine2')}</span>
          </h1>

          <p className="mb-12 text-center font-mono text-sm uppercase tracking-widest text-foreground/60 max-w-md">
            Craft the perfect resume for every opportunity — powered by AI
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            <a
              href="https://github.com/your-username/careercraft-ai"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
            >
              GitHub
            </a>
            <a
              href="https://github.com/your-username/careercraft-ai#readme"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
            >
              {t('home.docs')}
            </a>
            <Link href="/dashboard" className={buttonClass}>
              {t('home.launchApp')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
