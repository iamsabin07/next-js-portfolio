'use client';
import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const cursorR = document.getElementById('cursorRing');
    let mX = 0, mY = 0, rX = 0, rY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mX = e.clientX; mY = e.clientY;
      if (cursor) { 
        cursor.style.left = mX - 5 + 'px'; 
        cursor.style.top = mY - 5 + 'px'; 
      }
    };
    document.addEventListener('mousemove', onMouseMove);

    function animRing() {
      rX += (mX - rX - 19) * 0.12; 
      rY += (mY - rY - 19) * 0.12;
      if (cursorR) { 
        cursorR.style.left = rX + 'px'; 
        cursorR.style.top = rY + 'px'; 
      }
      rafId = requestAnimationFrame(animRing);
    }
    animRing();

    const applyHoverEffect = () => {
      if(cursor) cursor.style.transform = 'scale(3)'; 
      if(cursorR) cursorR.style.opacity = '0.2';
    };
    const removeHoverEffect = () => {
      if(cursor) cursor.style.transform = 'scale(1)'; 
      if(cursorR) cursorR.style.opacity = '0.6';
    };

    // Attach to interactive elements
    const interactables = document.querySelectorAll('a, button, .service-card, .theme-toggle');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', applyHoverEffect);
      el.addEventListener('mouseleave', removeHoverEffect);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', applyHoverEffect);
        el.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>
    </>
  );
}