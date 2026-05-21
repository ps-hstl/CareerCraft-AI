'use client';

/**
 * MatchScoreBadge — Extra Feature #2
 *
 * Displays an AI-computed keyword match percentage between a tailored resume
 * and its target job description. The score is calculated client-side by
 * comparing keyword overlap so it works without an extra API endpoint.
 *
 * Usage:
 *   <MatchScoreBadge resumeText="..." jobDescription="..." />
 */

import React, { useMemo } from 'react';

interface MatchScoreBadgeProps {
  resumeText?: string;
  jobDescription?: string;
  /** Fallback: pass a pre-computed 0-100 score instead of raw text */
  score?: number;
}

function computeMatchScore(resumeText: string, jobDescription: string): number {
  const tokenize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3);

  const jobTokens = new Set(tokenize(jobDescription));
  if (jobTokens.size === 0) return 0;

  const resumeTokens = new Set(tokenize(resumeText));
  let hits = 0;
  jobTokens.forEach((token) => {
    if (resumeTokens.has(token)) hits++;
  });

  return Math.min(100, Math.round((hits / jobTokens.size) * 100));
}

function getScoreColor(score: number): { ring: string; text: string; bg: string } {
  if (score >= 75) return { ring: '#059669', text: '#059669', bg: '#f0fdf4' };  // emerald
  if (score >= 50) return { ring: '#7c3aed', text: '#7c3aed', bg: '#faf5ff' };  // violet
  if (score >= 25) return { ring: '#f59e0b', text: '#d97706', bg: '#fffbeb' };  // amber
  return { ring: '#dc2626', text: '#dc2626', bg: '#fef2f2' };                   // red
}

export function MatchScoreBadge({ resumeText, jobDescription, score: propScore }: MatchScoreBadgeProps) {
  const score = useMemo(() => {
    if (propScore !== undefined) return propScore;
    if (!resumeText || !jobDescription) return null;
    return computeMatchScore(resumeText, jobDescription);
  }, [resumeText, jobDescription, propScore]);

  if (score === null) return null;

  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 14; // r=14
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div
      className="flex flex-col items-center gap-1"
      title={`Keyword match score: ${score}%`}
      style={{ minWidth: 52 }}
    >
      {/* Circular progress ring */}
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          {/* Progress */}
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke={colors.ring}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="butt"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        {/* Score number */}
        <div
          className="absolute inset-0 flex items-center justify-center font-mono font-bold"
          style={{ fontSize: 10, color: colors.text }}
        >
          {score}%
        </div>
      </div>
      <span
        className="font-mono uppercase tracking-wider"
        style={{ fontSize: 8, color: colors.text }}
      >
        Match
      </span>
    </div>
  );
}

export { computeMatchScore };
export default MatchScoreBadge;
