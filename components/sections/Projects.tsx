'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { PROJECT_DATA, type WorkEntry } from '../data/workdata';

// Lazy-load the modal so it doesn't block the initial render
const WorkModal = dynamic(() => import('../ui/WorkModal'), { ssr: false });

/* ─── SVG Icons ─── */
const ICONS: Record<WorkEntry['icon'], React.ReactNode> = {
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
      <path d="M12 18V6"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
};

/* ─── Card component ─── */
interface CardProps {
  entry: WorkEntry;
  revealClass: string;
  onClick: () => void;
}

function ServiceCard({ entry, revealClass, onClick }: CardProps) {
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    e.currentTarget.style.transform =
      `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
    e.currentTarget.style.transition = 'transform 0.1s ease';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHovered(false);
    e.currentTarget.style.transform =
      'perspective(600px) rotateY(0) rotateX(0) translateZ(0)';
    e.currentTarget.style.transition =
      'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
  };

  return (
    <div
      className={`service-card ${revealClass}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`Open metrics for ${entry.title}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      style={{ cursor: 'pointer', outline: 'none' }}
    >
      <div className="service-num">{entry.num}</div>
      <div className="service-icon">
        {ICONS[entry.icon]}
      </div>
      <div className="service-title">{entry.title}</div>
      <div className="service-sub">{entry.sub}</div>
      <div className="service-desc">{entry.desc}</div>

      {/* Hint that it's clickable */}
      <div style={{
        marginTop: 24,
        fontSize: 9,
        letterSpacing: '0.28em',
        textTransform: 'uppercase' as const,
        color: hovered ? '#C9A84C' : '#8B6914',
        display: 'flex',
        alignItems: 'center',
        gap: hovered ? 14 : 8,
        transition: 'color 0.3s, gap 0.3s',
      }}>
        {entry.badge}
        <span style={{ transition: 'transform 0.3s', transform: hovered ? 'translateX(4px)' : 'none' }}>→</span>
      </div>

      {/* "View metrics" hint on hover */}
      <div style={{
        marginTop: 8,
        fontSize: 9,
        letterSpacing: '0.25em',
        textTransform: 'uppercase' as const,
        color: 'rgba(201,168,76,0.45)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s',
      }}>
        View metrics ↗
      </div>
    </div>
  );
}

/* ─── Main section ─── */
export default function Projects() {
  const [activeEntry, setActiveEntry] = useState<WorkEntry | null>(null);

  /* Reveal-on-scroll observer */
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Responsive grid fix */
  useEffect(() => {
    function fixGrids() {
      const ph = document.querySelector('#projects .projects-half') as HTMLElement;
      if (window.innerWidth <= 900) {
        if (ph) ph.style.gridTemplateColumns = '1fr';
      } else {
        if (ph) ph.style.gridTemplateColumns = '1fr 1fr';
      }
    }
    fixGrids();
    window.addEventListener('resize', fixGrids);
    return () => window.removeEventListener('resize', fixGrids);
  }, []);

  return (
    <>
      <section id="projects">
        <div className="section-header reveal">
          <div className="section-tag">03 — Projects</div>
          <h2 className="section-title">Things I&apos;ve <em>Built</em></h2>
        </div>

        {/* 2 cards, side by side */}
        <div className="projects-half">
          {PROJECT_DATA.map((entry, i) => (
            <ServiceCard
              key={entry.id}
              entry={entry}
              revealClass={`reveal reveal-delay-${i + 1}`}
              onClick={() => setActiveEntry(entry)}
            />
          ))}
        </div>
      </section>

      {/* Modal (portal-style, rendered at root level via Next.js dynamic) */}
      <WorkModal
        entry={activeEntry}
        onClose={() => setActiveEntry(null)}
      />
    </>
  );
}