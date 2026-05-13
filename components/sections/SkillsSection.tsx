'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './SkillsSection.module.css';

// ─── SKILLS DATA ───
const SKILLS = [
  {
    title: 'Languages',
    level: 'Expert',
    proficiency: 92,
    tags: ['JavaScript ES6+', 'TypeScript', 'C#', 'Python', 'SQL', 'HTML5', 'CSS3 / SCSS'],
    color: '#E8CC80',
    iconPath: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    title: 'Frameworks',
    level: 'Expert',
    proficiency: 90,
    tags: ['React', 'Next.js', 'React Native', 'Node.js', 'ASP.NET Core', 'FastAPI', 'TailwindCSS', 'Redux'],
    color: '#61DAFB',
    iconPath: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  {
    title: 'Cloud & DevOps',
    level: 'Proficient',
    proficiency: 72,
    tags: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Azure DevOps', 'Terraform'],
    color: '#FF9A3C',
    iconPath: <path d="M3 15a4 4 0 004 4h9a5 5 0 001.8-9.7A6 6 0 003.8 8.3 4 4 0 003 15z" />,
  },
  {
    title: 'AI & ML',
    level: 'Advanced',
    proficiency: 78,
    tags: ['LLM Integration', 'RAG Systems', 'OpenAI API', 'Anthropic', 'Vector Embeddings', 'Prompt Engineering'],
    color: '#A78BFA',
    iconPath: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </>
    ),
  },
  {
    title: 'Databases',
    level: 'Expert',
    proficiency: 90,
    tags: ['PostgreSQL', 'MongoDB', 'SQL Server', 'Redis', 'Qdrant (Vector DB)', 'Entity Framework'],
    color: '#34D399',
    iconPath: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </>
    ),
  },
  {
    title: 'Engineering',
    level: 'Expert',
    proficiency: 88,
    tags: ['Agile / Scrum', 'Microservices', 'SSR', 'Testing (Cypress)', 'System Design', '0-to-1 Launches'],
    color: '#F472B6',
    iconPath: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
];

// ─── UTILS ───
const hexToRgb = (hex: string) => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
const lighten = (hex: string, amt: number) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgb(${Math.min(255, r + 255 * amt)},${Math.min(255, g + 255 * amt)},${Math.min(255, b + 255 * amt)})`;
};
const darken = (hex: string, amt: number) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgb(${Math.max(0, r - 255 * amt)},${Math.max(0, g - 255 * amt)},${Math.max(0, b - 255 * amt)})`;
};

export default function SkillsSection() {
  const [view, setView] = useState<'grid' | 'solar'>('grid');
  
  // Refs
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Tooltip internal nodes for fast DOM updates (bypassing React state)
  const ttTitleRef = useRef<HTMLDivElement>(null);
  const ttLevelRef = useRef<HTMLDivElement>(null);
  const ttTagsRef = useRef<HTMLDivElement>(null);
  const ttBarRef = useRef<HTMLDivElement>(null);

  // ─── GRID REVEAL OBSERVER ───
  useEffect(() => {
    if (view !== 'grid' || !gridContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            const bar = entry.target.querySelector(`.${styles.cardBarFill}`) as HTMLElement;
            if (bar) setTimeout(() => (bar.style.width = bar.dataset.pct + '%'), 200);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = gridContainerRef.current.querySelectorAll(`.${styles.skillCard}`);
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [view]);

  // ─── SOLAR SYSTEM LOGIC ───
  useEffect(() => {
    if (view !== 'solar' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let hoveredIdx = -1;
    const mouse = { x: -9999, y: -9999 };

    // Canvas Constants
    const SUN_R = 38;
    const PLANET_R = 18;
    const GAP = 126;
    const EDGE_PAD = 52;
    const BASE_SPEED = 0.00055;

    // State Variables for Canvas
    const angles = SKILLS.map((_, i) => (i / SKILLS.length) * Math.PI * 2);
    const speeds = SKILLS.map((_, i) => BASE_SPEED / (i + 1));
    let stars: any[] = [];
    let orbitRadii: number[] = [];
    
    // Texture Generation Functions
    const makeTexture = (color: string, size: number) => {
      const off = document.createElement('canvas');
      off.width = off.height = size * 4;
      const c = off.getContext('2d');
      if (!c) return off;
      const cr = size * 2;
      const grd = c.createRadialGradient(cr * 0.65, cr * 0.55, 0, cr, cr, cr);
      grd.addColorStop(0, lighten(color, 0.55));
      grd.addColorStop(0.4, color);
      grd.addColorStop(1, darken(color, 0.55));
      c.fillStyle = grd;
      c.beginPath(); c.arc(cr, cr, cr, 0, Math.PI * 2); c.fill();
      c.save(); c.beginPath(); c.arc(cr, cr, cr, 0, Math.PI * 2); c.clip();
      c.globalAlpha = 0.11;
      for (let j = 0; j < 7; j++) {
        const y = Math.random() * cr * 4, h = 3 + Math.random() * 14;
        c.fillStyle = j % 2 === 0 ? '#fff' : '#000';
        c.fillRect(0, y, cr * 4, h);
      }
      c.globalAlpha = 0.09;
      for (let j = 0; j < 5; j++) {
        const bx = Math.random() * cr * 4, by = Math.random() * cr * 4, br = 3 + Math.random() * 9;
        c.beginPath(); c.arc(bx, by, br, 0, Math.PI * 2);
        c.fillStyle = '#000'; c.fill();
      }
      c.restore();
      c.save(); c.beginPath(); c.arc(cr, cr, cr, 0, Math.PI * 2); c.clip();
      const hl = c.createRadialGradient(cr * 0.52, cr * 0.42, 0, cr * 0.52, cr * 0.42, cr * 0.65);
      hl.addColorStop(0, 'rgba(255,255,255,0.25)');
      hl.addColorStop(1, 'rgba(255,255,255,0)');
      c.fillStyle = hl; c.fillRect(0, 0, cr * 4, cr * 4);
      c.restore();
      return off;
    };

    const makeSunTexture = (sr: number) => {
      const off = document.createElement('canvas');
      off.width = off.height = sr * 4;
      const c = off.getContext('2d');
      if (!c) return off;
      const cr = sr * 2;
      const grd = c.createRadialGradient(cr, cr, 0, cr, cr, cr);
      grd.addColorStop(0, '#FFFDE8');
      grd.addColorStop(0.25, '#FFE566');
      grd.addColorStop(0.55, '#C9A84C');
      grd.addColorStop(0.82, '#7A4E0A');
      grd.addColorStop(1, 'rgba(80,40,4,0)');
      c.beginPath(); c.arc(cr, cr, cr, 0, Math.PI * 2);
      c.fillStyle = grd; c.fill();
      return off;
    };

    const textures = SKILLS.map((sk) => makeTexture(sk.color, PLANET_R));
    const sunTex = makeSunTexture(SUN_R);

    const buildStars = () => {
      stars = Array.from({ length: 130 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.1 + 0.2,
        a: Math.random() * 0.45 + 0.08,
        spd: Math.random() * 0.0008 + 0.0003,
      }));
    };

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.getBoundingClientRect().width;
        canvas.height = 700;
        buildStars();
      }
    };

    const computeOrbits = () => {
      const maxR = Math.min(canvas.width, canvas.height) / 2 - EDGE_PAD;
      const radii = [];
      let r = (SUN_R * 10.6 + PLANET_R + 20) * 3 + 2 * PLANET_R + GAP;
      for (let i = 0; i < SKILLS.length; i++) {
        radii.push(r);
        r += 10 * PLANET_R + GAP;
      }
      const outermost = radii[radii.length - 1] + PLANET_R;
      const scl = outermost > maxR ? maxR / outermost : 1;
      return radii.map((v) => v * scl*1.05);
    };

    // Event Listeners
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${e.clientX + 20}px`;
        tooltipRef.current.style.top = `${e.clientY - 12}px`;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      if (tooltipRef.current) tooltipRef.current.classList.remove(styles.visible);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Render Loop
    let lastTime = performance.now();
    const draw = (ts: number) => {
      const dt = Math.min(ts - lastTime, 50);
      lastTime = ts;

      const isDay = document.documentElement.getAttribute('data-theme') === 'day';

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      orbitRadii = computeOrbits();
      ctx.clearRect(0, 0, W, H);

      // Stars
      stars.forEach((s) => {
        const a = s.a * (0.6 + 0.4 * Math.sin(ts * s.spd));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237,232,220,${a})`; ctx.fill();
      });

      // Orbit Rings
      const orbitGold = isDay ? '154,106,10' : '201,168,76';
      orbitRadii.forEach((orR, i) => {
        ctx.beginPath(); ctx.arc(cx, cy, orR, 0, Math.PI * 2);
        ctx.strokeStyle = hoveredIdx === i
          ? `rgba(${orbitGold},${isDay ? '0.70' : '0.30'})`
          : `rgba(${orbitGold},${isDay ? '0.45' : '0.10'})`;
        ctx.lineWidth = hoveredIdx === i ? 1 : 0.7;
        ctx.setLineDash([4, 12]); ctx.stroke(); ctx.setLineDash([]);
        for (let t = 0; t < Math.PI * 2; t += Math.PI / 6) {
          const tx = cx + Math.cos(t) * orR;
          const ty = cy + Math.sin(t) * orR;
          ctx.beginPath(); ctx.arc(tx, ty, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${orbitGold},${isDay ? '0.55' : '0.18'})`; ctx.fill();
        }
      });

      const positions = orbitRadii.map((orR, i) => ({
        x: cx + Math.cos(angles[i]) * orR,
        y: cy + Math.sin(angles[i]) * orR,
      }));

      // Hover Detection
      hoveredIdx = -1;
      positions.forEach((p, i) => {
        if (Math.hypot(mouse.x - p.x, mouse.y - p.y) < PLANET_R + 10) hoveredIdx = i;
      });

      // Update Angles
      SKILLS.forEach((_, i) => {
        if (i !== hoveredIdx) angles[i] += speeds[i] * dt;
      });

      // Draw Sun
      ctx.save();
      ctx.drawImage(sunTex, cx - SUN_R * 2, cy - SUN_R * 2, SUN_R * 4, SUN_R * 4);
      const sunGlow = ctx.createRadialGradient(cx, cy, SUN_R * 0.4, cx, cy, SUN_R * 2.0);
      sunGlow.addColorStop(0, 'rgba(201,168,76,0.30)');
      sunGlow.addColorStop(0.6, 'rgba(201,168,76,0.08)');
      sunGlow.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath(); ctx.arc(cx, cy, SUN_R * 2.0, 0, Math.PI * 2); ctx.fill();
      ctx.font = '8px Tenor Sans, sans-serif';
      ctx.fillStyle = 'rgba(201,168,76,0.55)';
      ctx.textAlign = 'center';
      ctx.fillText('SABIN', cx, cy + SUN_R + 16);
      ctx.restore();

      // Tooltip State Updates
      if (hoveredIdx >= 0) {
        const p = positions[hoveredIdx];
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = 'rgba(201,168,76,0.20)';
        ctx.lineWidth = 0.6; ctx.setLineDash([3, 9]); ctx.stroke(); ctx.setLineDash([]);
        
        const sk = SKILLS[hoveredIdx];
        if (ttTitleRef.current) ttTitleRef.current.textContent = sk.title;
        if (ttLevelRef.current) ttLevelRef.current.textContent = `${sk.level} · ${sk.proficiency}%`;
        if (ttTagsRef.current) ttTagsRef.current.textContent = sk.tags.join(' · ');
        if (ttBarRef.current) {
          ttBarRef.current.style.width = `${sk.proficiency}%`;
          ttBarRef.current.style.background = sk.color;
        }
        if (tooltipRef.current) tooltipRef.current.classList.add(styles.visible);
      } else {
        if (tooltipRef.current) tooltipRef.current.classList.remove(styles.visible);
      }

      // Draw Planets (Sorted Y-axis)
      const order = positions.map((p, i) => ({ i, y: p.y })).sort((a, b) => a.y - b.y);

      order.forEach(({ i }) => {
        const sk = SKILLS[i];
        const { x, y } = positions[i];
        const hov = hoveredIdx === i;
        const pr = PLANET_R * (hov ? 1.25 : 1);
        const orR = orbitRadii[i];

        // Trail
        const TRAIL = 55;
        for (let t = 1; t <= TRAIL; t++) {
          const ta = angles[i] - (t / TRAIL) * 0.55;
          const tx = cx + Math.cos(ta) * orR;
          const ty = cy + Math.sin(ta) * orR;
          const al = (1 - t / TRAIL) * 0.16;
          const [r, g, b] = hexToRgb(sk.color);
          ctx.beginPath(); ctx.arc(tx, ty, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${al})`; ctx.fill();
        }

        // Glow
        if (hov) {
          const gl = ctx.createRadialGradient(x, y, pr * 0.4, x, y, pr * 2.5);
          gl.addColorStop(0, `${sk.color}50`);
          gl.addColorStop(1, `${sk.color}00`);
          ctx.fillStyle = gl;
          ctx.beginPath(); ctx.arc(x, y, pr * 2.5, 0, Math.PI * 2); ctx.fill();
        }

        // Planet Body
        ctx.save();
        ctx.beginPath(); ctx.arc(x, y, pr, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(textures[i], x - pr, y - pr, pr * 2, pr * 2);
        ctx.restore();

        // Proficiency Arc
        const arcEnd = -Math.PI / 2 + (sk.proficiency / 100) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(x, y, pr + 5, -Math.PI / 2, arcEnd);
        ctx.strokeStyle = hov ? sk.color : `${sk.color}77`;
        ctx.lineWidth = hov ? 2 : 1;
        ctx.stroke();

        // Rings Decoration
        if (i === 2 || i === 4) {
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(x, y, pr * 1.7, pr * 0.38, 0.22, 0, Math.PI * 2);
          ctx.strokeStyle = `${sk.color}55`; ctx.lineWidth = 2.5; ctx.stroke();
          ctx.restore();
        }

        // Label
        ctx.globalAlpha = hov ? 1 : 0.72;
        ctx.font = `${hov ? 700 : 400} 9px Tenor Sans`;
        ctx.fillStyle = hov
          ? sk.color
          : isDay
            ? 'rgba(154,106,10,0.85)'
            : 'rgba(237,232,220,0.75)';
        ctx.textAlign = 'center';
        ctx.fillText(sk.title.toUpperCase(), x, y + pr + 15);
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [view]);

  return (
    <div className={styles.container}>
      <section className={styles.skillsSection}>
        {/* HEADER */}
        <div className={styles.skillsHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.sectionTag}>Technical Expertise</div>
            <h2 className={styles.sectionTitle}>
              Tools of the <em>Trade</em>
            </h2>
          </div>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.toggleBtn} ${view === 'grid' ? styles.active : ''}`}
              onClick={() => setView('grid')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              Grid
            </button>
            <button
              className={`${styles.toggleBtn} ${view === 'solar' ? styles.active : ''}`}
              onClick={() => {
                if (window.innerWidth > 760) setView('solar');
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
              </svg>
              Orbit
            </button>
          </div>
        </div>

        {/* VIEW 1: GRID */}
        <div ref={gridContainerRef} className={`${styles.gridView} ${view !== 'grid' ? styles.hidden : ''}`}>
          {SKILLS.map((sk, i) => (
            <div key={i} className={styles.skillCard} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className={styles.cardNum}>0{i + 1}</div>
              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {sk.iconPath}
                </svg>
              </div>
              <div className={styles.cardTitle}>{sk.title}</div>
              <div className={styles.cardLevel} style={{ color: sk.color }}>
                {sk.level}
              </div>
              <div className={styles.cardTags}>
                {sk.tags.map((t, idx) => (
                  <span key={idx} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={styles.cardBarWrap}>
                <div className={styles.cardBarLabel}>
                  <span>Proficiency</span>
                  <span>{sk.proficiency}%</span>
                </div>
                <div className={styles.cardBarTrack}>
                  <div
                    className={styles.cardBarFill}
                    data-pct={sk.proficiency}
                    style={{
                      background: `linear-gradient(to right, ${sk.color}88, ${sk.color})`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW 2: SOLAR */}
        <div className={`${styles.solarView} ${view !== 'solar' ? styles.hidden : ''}`}>
          <canvas ref={canvasRef} className={styles.solarCanvas}></canvas>
          <div className={styles.solarLegend}>
            {SKILLS.map((sk, i) => (
              <div key={i} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{ background: sk.color, boxShadow: `0 0 6px ${sk.color}88` }}
                ></span>
                {sk.title}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLTIP */}
      <div ref={tooltipRef} className={styles.planetTooltip}>
        <div className={styles.tooltipInner}>
          <div ref={ttTitleRef} className={styles.ttTitle}></div>
          <div ref={ttLevelRef} className={styles.ttLevel}></div>
          <div ref={ttTagsRef} className={styles.ttTags}></div>
          <div className={styles.ttBar}>
            <div ref={ttBarRef} className={styles.ttBarFill}></div>
          </div>
        </div>
      </div>
    </div>
  );
}