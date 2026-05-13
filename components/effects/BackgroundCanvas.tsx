'use client';
import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W: number, H: number;
    let animationId: number;

    function resize() { 
      W = canvas!.width = window.innerWidth; 
      H = canvas!.height = window.innerHeight; 
    }
    resize(); 
    window.addEventListener('resize', resize);
    
    let particleColor = [201, 168, 76];

    class Particle {
      x = 0; y = 0; z = 0; vx = 0; vy = 0; r = 0; alpha = 0; pulse = 0;
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H; this.z = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - .5) * .4 * this.z; this.vy = (Math.random() - .5) * .4 * this.z;
        this.r = Math.random() * 1.5 + .3; this.alpha = Math.random() * .5 + .1; this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.pulse += .02;
        if (this.x < -50) this.x = W + 50; if (this.x > W + 50) this.x = -50;
        if (this.y < -50) this.y = H + 50; if (this.y > H + 50) this.y = -50;
      }
      draw() {
        const a = this.alpha * (.7 + .3 * Math.sin(this.pulse));
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor[0]},${particleColor[1]},${particleColor[2]},${a})`; ctx.fill();
      }
    }
    const particles: Particle[] = [];
    for (let i = 0; i < 100; i++) particles.push(new Particle());
    const mouse3D = { x: 0, y: 0 };
    
    const handleMouseMove = (e: MouseEvent) => { 
        mouse3D.x = e.clientX; mouse3D.y = e.clientY; 
    };
    document.addEventListener('mousemove', handleMouseMove);

    function drawConnections() {
      const maxDist = 130, pc = particleColor;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(${pc[0]},${pc[1]},${pc[2]},${(1 - d / maxDist) * .1})`; ctx.lineWidth = .5; ctx.stroke(); }
        }
        const mdx = particles[i].x - mouse3D.x, mdy = particles[i].y - mouse3D.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 180) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(mouse3D.x, mouse3D.y); ctx.strokeStyle = `rgba(${pc[0]},${pc[1]},${pc[2]},${(1 - md / 180) * .3})`; ctx.lineWidth = .7; ctx.stroke(); }
      }
    }
    
    let ringAngle = 0;
    function drawRings() {
      ringAngle += .003; const cx = W / 2, cy = H / 2, pc = particleColor;
      [260, 400, 560].forEach((r, i) => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(ringAngle * (i % 2 === 0 ? 1 : -1) + i);
        ctx.beginPath(); ctx.ellipse(0, 0, r, r * .4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${pc[0]},${pc[1]},${pc[2]},${.04 - i * .01})`; ctx.lineWidth = .8; ctx.setLineDash([4, 12]); ctx.stroke(); ctx.restore();
      });
    }

    function drawHexGrid() {
      const s = 60, cols = Math.ceil(W / (s * 1.5)) + 1, rows = Math.ceil(H / (s * Math.sqrt(3))) + 1, t = Date.now() * .001, pc = particleColor;
      for (let col = 0; col < cols; col++) { for (let row = 0; row < rows; row++) {
        const x = col * s * 1.5, y = row * s * Math.sqrt(3) + (col % 2 === 0 ? 0 : s * Math.sqrt(3) / 2), wave = Math.sin(t * .5 + col * .3 + row * .4) * .5 + .5;
        ctx.beginPath();
        for (let k = 0; k < 6; k++) { const angle = (Math.PI / 180) * (60 * k - 30); k === 0 ? ctx.moveTo(x + s * .5 * Math.cos(angle), y + s * .5 * Math.sin(angle)) : ctx.lineTo(x + s * .5 * Math.cos(angle), y + s * .5 * Math.sin(angle)); }
        ctx.closePath(); ctx.strokeStyle = `rgba(${pc[0]},${pc[1]},${pc[2]},${wave * .025})`; ctx.lineWidth = .5; ctx.stroke();
      }}
    }

    function animate() { 
      ctx.clearRect(0, 0, W, H); 
      drawHexGrid(); 
      drawRings(); 
      particles.forEach(p => { p.update(); p.draw(); }); 
      drawConnections(); 
      animationId = requestAnimationFrame(animate); 
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef}></canvas>;
}