'use client';

import { useEffect, useRef, useState } from 'react';
import { WorkEntry } from '../data/workdata';
import styles from './WorkModal.module.css';

interface WorkModalProps {
  entry: WorkEntry | null;
  onClose: () => void;
}

/* ──────────────────────────────────────────
   Donut chart drawn on <canvas>.
   ────────────────────────────────────────── */
function DonutChart({ rings }: { rings: WorkEntry['modal']['rings'] }) {
  const ref    = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const total  = rings.reduce((s, r) => s + r.pct, 0);
    const cx     = canvas.width  / 2;
    const cy     = canvas.height / 2;
    const outer  = cx * 0.78;
    const inner  = cx * 0.50;
    const GAP    = 0.03; // radians gap between slices

    const start = performance.now();

    const draw = (now: number) => {
      const raw = Math.min((now - start) / 900, 1);
      const t   = 1 - Math.pow(1 - raw, 3); // ease-out cubic

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let angle = -Math.PI / 2;
      rings.forEach(seg => {
        const full  = (seg.pct / total) * 2 * Math.PI;
        const sweep = full * t;
        const a0    = angle + GAP / 2;
        const a1    = angle + sweep - GAP / 2;

        if (a1 > a0) {
          ctx.beginPath();
          ctx.moveTo(cx + inner * Math.cos(a0), cy + inner * Math.sin(a0));
          ctx.arc(cx, cy, outer, a0, a1);
          ctx.arc(cx, cy, inner, a1, a0, true);
          ctx.closePath();
          ctx.fillStyle = seg.color;
          ctx.fill();
        }
        angle += full;
      });

      if (raw < 1) rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rings]);

  return (
    <canvas
      ref={ref}
      width={120}
      height={120}
      role="img"
      aria-label="Donut chart showing distribution"
      style={{ flexShrink: 0 }}
    />
  );
}

/* ─── Animated number counter ─── */
function Counter({ value }: { value: string }) {
  const digits = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const isNum  = !isNaN(digits) && suffix !== value;

  const [display, setDisplay] = useState(isNum ? `0${suffix}` : value);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!isNum) { setDisplay(value); return; }
    const start = performance.now();
    const tick  = (now: number) => {
      const t    = Math.min((now - start) / 800, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(ease * digits) + suffix);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, isNum, digits, suffix]);

  return <>{display}</>;
}

/* ─── Modal ─── */
export default function WorkModal({ entry, onClose }: WorkModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Escape to close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = entry ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [entry]);

  if (!entry) return null;
  const m = entry.modal;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className={styles.panel}>

        {/* Accent bar */}
        <div className={styles.topBar} />

        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.title}>{entry.title}</div>
            <div className={styles.sub}>{m.sub}</div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>

          {/* ── Stats ── */}
          <div
            className={styles.stats}
            style={{ gridTemplateColumns: `repeat(${m.stats.length}, 1fr)` }}
          >
            {m.stats.map((s, i) => (
              <div key={i} className={styles.statCell}>
                <div className={styles.statNum}><Counter value={s.num} /></div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── Timeline ── */}
          <div className={styles.label}>{m.timelineLabel}</div>
          <div className={styles.timeline}>
            <div className={styles.tlLine} />
            {m.timeline.map((tl, i) => (
              <div key={i} className={styles.tlRow}>
                <div className={`${styles.tlDot} ${tl.active ? styles.active : ''}`} />
                <div className={styles.tlText} dangerouslySetInnerHTML={{ __html: tl.text }} />
              </div>
            ))}
          </div>

          {/* ── Donut ring ── */}
          <div className={styles.label}>{m.ringLabel}</div>
          <div className={styles.ringWrap}>
            <DonutChart rings={m.rings} />
            <div className={styles.ringLegend}>
              {m.rings.map((r, i) => (
                <div key={i} className={styles.ringItem}>
                  <span className={styles.ringDot} style={{ background: r.color }} />
                  {r.label} — {r.pct}%
                </div>
              ))}
            </div>
          </div>

          {/* ── Tags ── */}
          <div className={styles.label}>Tech Stack</div>
          <div className={styles.tags}>
            {m.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
          </div>

        </div>
      </div>
    </div>
  );
}