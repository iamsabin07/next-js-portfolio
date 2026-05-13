'use client';
import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    const hellos = [
      {word:'नमस्ते',lang:'Nepali'},{word:'Hello',lang:'English'},
      {word:'नमस्कार',lang:'Hindi'},{word:'Hola',lang:'Spanish'},
      {word:'Bonjour',lang:'French'},{word:'Ciao',lang:'Italian'},
      {word:'Hallo',lang:'German'},{word:'你好',lang:'Chinese'},
      {word:'こんにちは',lang:'Japanese'},{word:'안녕하세요',lang:'Korean'},
      {word:'مرحبا',lang:'Arabic'},{word:'Olá',lang:'Portuguese'}
    ];
    
    const loaderEl = document.getElementById('loader');
    const helloEl = document.getElementById('loaderHello');
    const langEl = document.getElementById('loaderLang');
    const fillEl = document.getElementById('loaderFill') as HTMLElement;
    const numEl = document.getElementById('loaderNum');
    
    let hIdx = 0, progress = 0;
    const WORD_DURATION = 900, FADE_DURATION = 350;
    let lastSwitch = performance.now();
    let fadeState = 'visible';
    let fadeStart = 0;
    let rafId: number;

    function loaderRaf(now: number) {
      const elapsed = now - lastSwitch;
      if (fadeState === 'visible' && elapsed >= WORD_DURATION) { 
        fadeState = 'fading-out'; fadeStart = now; 
      }
      if (fadeState === 'fading-out') {
        const t = Math.min((now - fadeStart) / FADE_DURATION, 1);
        const ease = t * t;
        if (helloEl) helloEl.style.opacity = String(1 - ease);
        if (langEl) langEl.style.opacity = String(1 - ease);
        if (t >= 1) { 
          fadeState = 'fading-in'; 
          fadeStart = now; 
          hIdx = (hIdx + 1) % hellos.length; 
          if(helloEl) helloEl.textContent = hellos[hIdx].word; 
          if(langEl) langEl.textContent = hellos[hIdx].lang; 
        }
      }
      if (fadeState === 'fading-in') {
        const t = Math.min((now - fadeStart) / FADE_DURATION, 1);
        const ease = 1 - (1 - t) * (1 - t);
        if (helloEl) helloEl.style.opacity = String(ease);
        if (langEl) langEl.style.opacity = String(ease);
        if (t >= 1) { fadeState = 'visible'; lastSwitch = now; }
      }
      if (loaderEl && !loaderEl.classList.contains('hidden')) {
        rafId = requestAnimationFrame(loaderRaf);
      }
    }
    rafId = requestAnimationFrame(loaderRaf);

    const totalDuration = 4200, interval = 50, steps = totalDuration / interval, increment = 100 / steps;
    const counter = setInterval(() => {
      progress = Math.min(progress + increment, 100);
      if (fillEl) fillEl.style.width = progress + '%';
      if (numEl) numEl.textContent = String(Math.floor(progress));
      if (progress >= 100) {
        clearInterval(counter);
        setTimeout(() => loaderEl?.classList.add('hidden'), 500);
      }
    }, interval);

    return () => {
      clearInterval(counter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="page-loader" id="loader">
      <div className="loader-hello" id="loaderHello">नमस्ते</div>
      <div className="loader-lang" id="loaderLang">Nepali</div>
      <div className="loader-progress-wrap">
        <div className="loader-track"><div className="loader-fill" id="loaderFill"></div></div>
        <div className="loader-num" id="loaderNum">0</div>
      </div>
      <div className="loader-name-wrap">SABIN · THAPA</div>
    </div>
  );
}