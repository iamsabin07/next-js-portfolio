'use client';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const toggleBtn = document.getElementById('themeToggle');
    let isDark = true;
    const handleThemeToggle = () => {
      isDark = !isDark;
      document.documentElement.setAttribute('data-theme', isDark ? 'night' : 'day');
    };
    toggleBtn?.addEventListener('click', handleThemeToggle);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      toggleBtn?.removeEventListener('click', handleThemeToggle);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className={`mobile-nav ${isOpen ? 'open' : ''}`} id="mobileNav">
        <a href="#about" className="mobile-link" onClick={closeMenu}>About</a>
        <a href="#work" className="mobile-link" onClick={closeMenu}>Work</a>
        <a href="#skills" className="mobile-link" onClick={closeMenu}>Skills</a>
        <a href="#contact" className="mobile-link" onClick={closeMenu}>Contact</a>
      </div>

      <nav id="nav">
        <a href="#" className="nav-logo">SABIN</a>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#terminal">Terminal</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="theme-toggle" id="themeToggle" title="Toggle day/night">
            <div className="theme-toggle-thumb">
              <svg className="theme-toggle-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'#060608'}}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <svg className="theme-toggle-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color:'#F5F0E8'}}>
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </div>
          </div>
          <div className={`hamburger ${isOpen ? 'open' : ''}`} id="hamburger" onClick={() => setIsOpen(!isOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>
    </>
  );
}