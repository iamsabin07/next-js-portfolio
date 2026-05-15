'use client';
import { useEffect } from 'react';
import Image from 'next/image';

export default function About() {
  useEffect(() => {
    function animateCounter(el: Element) {
      const raw = el.textContent?.trim() || '';
      const hasPlus = raw.includes('+');
      const hasDollar = raw.includes('$');
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      
      if (isNaN(num)) return;
      
      const dur = 1600, start = performance.now();
      
      (function update(now: number) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = num * eased;
        const disp = Number.isInteger(num) ? Math.floor(cur) : cur.toFixed(1);
        
        el.textContent = (hasDollar ? '$' : '') + disp + (hasPlus ? '+' : '');
        if (p < 1) requestAnimationFrame(update); 
        else el.textContent = raw;
      })(start);
    }

    const statObs = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) { 
          e.target.querySelectorAll('.stat-num').forEach(animateCounter); 
          statObs.unobserve(e.target); 
        } 
      });
    }, { threshold: .5 });

    document.querySelectorAll('.about-stats').forEach(el => statObs.observe(el));

    return () => statObs.disconnect();
  }, []);

  return (
    <section id="about">
      {/* LEFT: Profile Card */}
      <div className="profile-card reveal">
        <div className="profile-photo-wrap">
          <Image
            src="/sabin-card.png"
            alt="Sabin Thapa"
            width={420} 
            height={420}
            className="profile-photo"
            style={{background:'transparent', width: '100%', height: '520px'}}
          />
          <div className="profile-photo-overlay"></div>
        </div>
        
        <div className="profile-card-body">
          <div className="profile-name">Sabin Thapa</div>
          <div className="profile-role">Full Stack Developer</div>
          <div className="profile-divider"></div>
          <div className="profile-meta-grid">
            <div className="profile-meta-row">
              <span className="profile-meta-key">instagram</span>
              <span className="profile-meta-val"><a href="https://instagram.com/iamsabin07" target="_blank" rel="noreferrer" className="profile-link">@iamsabin07</a></span>
            </div>
            <div className="profile-meta-row">
              <span className="profile-meta-key">linkedin</span>
              <span className="profile-meta-val"><a href="https://linkedin.com/in/iamsabin07" target="_blank" rel="noreferrer" className="profile-link">in/iamsabin07</a></span>
            </div>
            <div className="profile-meta-row">
              <span className="profile-meta-key">x · twitter</span>
              <span className="profile-meta-val"><a href="https://x.com/iamsabin07" target="_blank" rel="noreferrer" className="profile-link">@iamsabin07</a></span>
            </div>
          </div>
          <div className="profile-divider"></div>
          <div className="profile-section-label">hobbies</div>
          <div className="profile-tags">
            {['Chess','Football','Gym','Reading'].map(h => (
              <span key={h} className="profile-tag">{h}</span>
            ))}
          </div>
          <div className="profile-section-label profile-section-label--lang">languages</div>
          <div className="profile-tags">
            {['Nepali','Hindi','English'].map(l => (
              <span key={l} className="profile-tag profile-tag-lang">{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Text */}
      <div>
        <div className="reveal">
          <div className="about-label">About Me</div>
          <h2 className="about-heading">Engineer by craft,<br /><em>builder by instinct</em></h2>
        </div>
        <div className="about-body reveal reveal-delay-2">
          <p>
            <br/><br/>
            I'm Sabin Thapa — a Full Stack Developer based in Kearny, NJ, specializing in 
            the architecture of high-stakes digital ecosystems. My expertise lies at the 
            intersection of <strong>engineering rigor and data intelligence</strong>, moving 
            comfortably between complex cloud infrastructure and the integration of 
            specialized AI/LLM systems.
          </p>
          <p>
            At <strong>Applied Dynamic Solutions</strong>, I bridge the gap between 
            technical debt and product innovation. I’ve architected internal SDKs and 
            real-time visualizers that transformed how we handle enterprise data, driving 
            60% faster release cycles. Beyond the code, I lead a team of interns, 
            translating C-suite requirements into actionable technical roadmaps while 
            mentoring the next generation of engineers in Agile best practices.
          </p>
          <p>
            Currently, I am compounding my BS in Computer Science with an 
            <strong> Executive MS in Data Science & Analytics</strong> at New England College. 
            My recent work focuses on <strong>RAG-based knowledge retrieval</strong> and 
            vector embeddings—building AI-powered simulators that don’t just process 
            data, but provide strategic context.
          </p>
          <p>
            Whether I'm optimizing a financial workflow processing $75M annually or 
            refining a neural network for predictive modeling, I build things that 
            <strong> scale, ship, and matter</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}