"use client";
import { useEffect, useRef } from "react";

interface Blob {
  x: number; y: number; r: number;
  vx: number; vy: number;
  color: string;
  phase: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const blobs: Blob[] = [
      { x: 0.2, y: 0.3, r: 0.35, vx: 0.0008, vy: 0.0006, color: "", phase: 0 },
      { x: 0.8, y: 0.6, r: 0.3, vx: -0.0006, vy: 0.0009, color: "", phase: 1.5 },
      { x: 0.5, y: 0.8, r: 0.25, vx: 0.0007, vy: -0.0005, color: "", phase: 3 },
      { x: 0.7, y: 0.2, r: 0.2, vx: -0.0009, vy: -0.0007, color: "", phase: 4.5 },
    ];

    interface Particle { x: number; y: number; vx: number; vy: number; r: number; alpha: number; }
    const particles: Particle[] = [];
    const MAX_PARTICLES = 40;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        r: 0.5 + Math.random() * 1.5,
        alpha: 0.1 + Math.random() * 0.3,
      });
    }

    let animationId: number;
    let visible = true;

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) draw();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const draw = () => {
      if (!visible) return;
      const W = canvas.width, H = canvas.height;
      const t = Date.now() * 0.00008;
      const light = isLight();

      ctx.clearRect(0, 0, W, H);

      const altColors = light
        ? ["rgba(212,175,55,0.08)", "rgba(16,185,129,0.05)", "rgba(59,130,246,0.05)", "rgba(212,175,55,0.06)"]
        : ["rgba(212,175,55,0.06)", "rgba(16,185,129,0.04)", "rgba(59,130,246,0.04)", "rgba(212,175,55,0.05)"];

      blobs.forEach((b, bi) => {
        const x = W * (b.x + Math.sin(t * b.vx + b.phase) * 0.12);
        const y = H * (b.y + Math.cos(t * b.vy + b.phase) * 0.12);
        const r = Math.min(W, H) * b.r * (1 + Math.sin(t * 0.3 + b.phase) * 0.08);
        const color = altColors[bi];
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(0.4, color.replace(/[\d.]+(?=\))/, (m) => String(Number(m) * 0.5)));
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      const particleColor = light ? '180,175,55' : '212,175,55';
      particles.forEach(p => {
        const x = W * (p.x + Math.sin(t * 10 + p.vx * 10000) * 0.002);
        const y = H * (p.y + Math.cos(t * 10 + p.vy * 10000) * 0.002);
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor},${p.alpha * (0.5 + Math.sin(t + p.x * 100) * 0.5)})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const observer = new MutationObserver(() => {});
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  );
}
