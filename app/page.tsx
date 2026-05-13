'use client';
import BackgroundCanvas from '@/components/effects/BackgroundCanvas';
import Cursor from '@/components/effects/Cursor';
import Loader from '@/components/effects/Loader';
import Footer from '@/components/layout/Footer';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Hero from '@/components/sections/Hero';
import SkillsSection from '@/components/sections/SkillsSection';
import Work from '@/components/sections/Work';
import Marquee from '@/components/ui/Marquee';
import Navigation from '@/components/layout/Navigation';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // SCROLL REVEAL
    const io = new IntersectionObserver(entries => entries.forEach(e => { 
      if (e.isIntersecting) { 
        e.target.classList.add('visible'); 
        io.unobserve(e.target); 
      } 
    }), { threshold: .1 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // SECTION LINES
    document.querySelectorAll('.section-header').forEach(h => { 
      if (!h.querySelector('.section-line')) {
        const l = document.createElement('span'); 
        l.className = 'section-line'; 
        h.appendChild(l); 
      }
    });

    // GLOW DOTS
    const glowInterval = setInterval(() => {
      const d = document.createElement('div'); d.className = 'glow-dot';
      const size = Math.random() * 4 + 2, dur = Math.random() * 8 + 6, pc = [201, 168, 76];
      d.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}vw;bottom:-10px;background:radial-gradient(circle,rgba(${pc[0]},${pc[1]},${pc[2]},0.7),transparent);animation-duration:${dur}s;animation-delay:${Math.random() * 3}s;`;
      document.body.appendChild(d); setTimeout(() => d.remove(), (dur + 3) * 1000);
    }, 1400);

    // RIPPLE EFFECT DELEGATION
    const handleRipple = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.btn-primary');
      if (!target) return;
      const btn = target as HTMLElement;
      const r = document.createElement('span'); r.className = 'ripple';
      const rect = btn.getBoundingClientRect(), size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;`;
      btn.appendChild(r); setTimeout(() => r.remove(), 700);
    };
    document.addEventListener('click', handleRipple);

    return () => {
      clearInterval(glowInterval);
      document.removeEventListener('click', handleRipple);
    };
  }, []);

  return (
    <>
      <Loader />
      <Cursor />
      <BackgroundCanvas />
      
      <div className="wrap">
        <Navigation />
        <Hero />
        <Marquee items={['Full Stack', 'Cloud', 'AI Integration', 'DevOps', 'Full Stack', 'Cloud', 'AI Integration', 'DevOps']} />
        <About />
        <Work />
        <section id="skills">
          <SkillsSection/>
        </section>
        <Marquee 
          items={['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Azure', 'React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Azure']} 
          reverse 
        />
        <Contact />
        <Footer />
      </div>
    </>
  );
}