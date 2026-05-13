'use client';
import { useEffect } from 'react';
import HeroHuman from './HeroHuman';

export default function Hero() {
  useEffect(() => {
    // TYPED CURSOR
    const heroNameEl = document.querySelector('.hero-name');
    if (heroNameEl && !heroNameEl.querySelector('.typed-cursor')) { 
      const tc = document.createElement('span'); 
      tc.className = 'typed-cursor'; 
      heroNameEl.appendChild(tc); 
      setTimeout(() => tc.remove(), 5000); 
    }
  }, []);

  return (
    <section id="hero">
      <div className="hero-text">
        <div className="hero-topbar">
          <span className="hero-location-tag">~/sabin — kearny · nj</span>
          <span className="hero-status-dot"><span className="hero-status-pulse"></span>available for work</span>
        </div>

        <div className="hero-eyebrow">Full Stack Developer</div>
        <h1 className="hero-name">
          Not your average<br /><em>full-stack engineer.</em>
        </h1>
        <p className="hero-desc">
          3+ years building production-grade software across the full stack — cloud infrastructure, distributed systems, AI/LLM integration — with measurable impact at every layer.
        </p>
        <div className="hero-cta">
          <a href="#work" className="btn-primary"><span>See the work →</span></a>
          <a href="#contact" className="btn-text">Hire me</a>
        </div>

        <div className="hero-metrics">
          <div className="hero-metric-item">
            <span className="hero-metric-num">3+</span>
            <span className="hero-metric-label">Years in<br/>Production</span>
          </div>
          <div className="hero-metric-divider"></div>
          <div className="hero-metric-item">
            <span className="hero-metric-num">15+</span>
            <span className="hero-metric-label">Apps<br/>Shipped</span>
          </div>
          <div className="hero-metric-divider"></div>
          <div className="hero-metric-item">
            <span className="hero-metric-num">$75M</span>
            <span className="hero-metric-label">Platform<br/>Volume</span>
          </div>
          <div className="hero-metric-divider"></div>
          <div className="hero-metric-item">
            <span className="hero-metric-num">4.0</span>
            <span className="hero-metric-label">Graduate<br/>GPA</span>
          </div>
        </div>
      </div>
      
      <HeroHuman />

      <div className="scroll-hint"><div className="scroll-line" style={{marginTop: '-20px'}}></div><span>Scroll</span></div>
    </section>
  );
}