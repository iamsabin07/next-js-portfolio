'use client';
import { useEffect } from 'react';

export default function Work() {
  useEffect(() => {
    // CARD TILT EFFECT
    const handleMouseMove = (e: Event, card: HTMLElement) => {
      const me = e as MouseEvent;
      const rect = card.getBoundingClientRect();
      const x = (me.clientX - rect.left) / rect.width - 0.5;
      const y = (me.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`; 
      card.style.transition = 'transform 0.1s ease';
    };

    const handleMouseLeave = (card: HTMLElement) => {
      card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateZ(0)'; 
      card.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
    };

    const cards = document.querySelectorAll('.service-card');
    cards.forEach(c => {
      const card = c as HTMLElement;
      card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => handleMouseLeave(card));
    });

    // RESPONSIVE GRIDS FIX
    function fixGrids() {
      const ph = document.querySelector('.projects-half') as HTMLElement;
      const sg = document.querySelector('.skills-grid') as HTMLElement;
      if (window.innerWidth <= 900) { 
        if (ph) ph.style.gridTemplateColumns = '1fr'; 
        if (sg) sg.style.gridTemplateColumns = '1fr'; 
      } else { 
        if (ph) ph.style.gridTemplateColumns = '1fr 1fr'; 
        if (sg) sg.style.gridTemplateColumns = 'repeat(3,1fr)'; 
      }
    }
    fixGrids(); 
    window.addEventListener('resize', fixGrids);

    return () => {
      window.removeEventListener('resize', fixGrids);
      // Clean up tilt listeners
      cards.forEach(c => {
        const card = c as HTMLElement;
        const newCard = card.cloneNode(true);
        card.parentNode?.replaceChild(newCard, card);
      });
    };
  }, []);

  return (
    <section id="work">
      <div className="section-header reveal">
        <div className="section-tag">02 — Experience &amp; Projects</div>
        <h2 className="section-title">Where I&apos;ve <em>Built</em></h2>
      </div>
      <div className="services-grid">
        <div className="service-card reveal reveal-delay-1">
          <div className="service-num">01</div>
          <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
          <div className="service-title">Applied Dynamic Solutions</div>
          <div className="service-sub">Full Stack Developer · 2022 – Present</div>
          <div className="service-desc">Developed 15+ production web &amp; mobile apps across ASP.NET Core, Node.js, Python, React, and Next.js. Established reusable frontend templates cutting new project setup by 70%. Implemented CI/CD pipelines in Azure DevOps with Docker &amp; Kubernetes, reducing release cycles by 60%.</div>
          <div className="service-arrow">Monroe Township, NJ</div>
        </div>
        <div className="service-card reveal reveal-delay-2">
          <div className="service-num">02</div>
          <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
          <div className="service-title">Where Trades Go</div>
          <div className="service-sub">Key Client · East Hanover, NJ</div>
          <div className="service-desc">Led 0-to-1 development of a full-stack jobs marketplace for tradespeople, growing to 10,000+ users including 2,000+ paid contractors. Designed weighted scoring algorithms achieving 95% user satisfaction.</div>
          <div className="service-arrow">10K+ Users</div>
        </div>
        <div className="service-card reveal reveal-delay-3">
          <div className="service-num">03</div>
          <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
          <div className="service-title">AFM &amp; SAG-AFTRA</div>
          <div className="service-sub">Key Client · Valley Village, CA</div>
          <div className="service-desc">Deployed automated e-forms workflow replacing paper processes, delivering a 7× increase in signed form return rates. Optimized a royalty distribution platform for financial workflows processing over $75M annually.</div>
          <div className="service-arrow">$75M+ Processed</div>
        </div>
      </div>
      <div className="projects-half">
        <div className="service-card reveal reveal-delay-1">
          <div className="service-num">04</div>
          <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg></div>
          <div className="service-title">Consensus</div>
          <div className="service-sub">AI Boardroom Simulator · Oct–Dec 2025</div>
          <div className="service-desc">Co-developed a RAG-driven knowledge retrieval system and RL simulation framework, achieving 35% reduction in inference latency and 1.5× improvement in decision-making accuracy across multi-model workflows.</div>
          <div className="service-arrow">RAG + RL Framework</div>
        </div>
        <div className="service-card reveal reveal-delay-2">
          <div className="service-num">05</div>
          <div className="service-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg></div>
          <div className="service-title">NFC Card System</div>
          <div className="service-sub">Digital Identity Platform · Jul–Aug 2025</div>
          <div className="service-desc">Architected and shipped a full-stack digital identity platform solo in under 8 weeks. NFC tap-to-share contact delivery, dynamic profile routing, Stripe payments, and real-time WebSockets analytics — 100+ profiles without app installs.</div>
          <div className="service-arrow">Solo · 8 Weeks</div>
        </div>
      </div>
    </section>
  );
}