"use client";
import { useEffect, useRef } from "react";

const ORBS = [
  { x: 0.15, y: 0.25, r: 0.35, color: "rgba(212,175,55,0.06)", speed: 0.00008 },
  { x: 0.85, y: 0.15, r: 0.28, color: "rgba(139,92,246,0.04)", speed: 0.00006 },
  { x: 0.5, y: 0.75, r: 0.4, color: "rgba(212,175,55,0.04)", speed: 0.00005 },
  { x: 0.75, y: 0.6, r: 0.25, color: "rgba(139,92,246,0.03)", speed: 0.00007 },
];

interface Particle {
  x: number; y: number;
  size: number; speedX: number; speedY: number;
  opacity: number; color: string;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const initParticles = () => {
      const count = isMobile ? 25 : 50;
      const colors = ["#D4AF37", "#B8860B", "#FFD700"];
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };
    initParticles();

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      tRef.current += 1;
      const t = tRef.current;

      ORBS.forEach((o, i) => {
        const angle = t * o.speed * 1000 + i * 1.5;
        const ox = (o.x + Math.sin(angle) * 0.08) * W;
        const oy = (o.y + Math.cos(angle * 0.7) * 0.06) * H;
        const r = o.r * Math.min(W, H);
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        g.addColorStop(0, o.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      ctx.strokeStyle = "rgba(255,255,255,0.012)";
      ctx.lineWidth = 1;
      const gs = 80;
      for (let x = 0; x < W; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      if (!reducedMotion) {
        particlesRef.current.forEach(p => {
          p.x += p.speedX; p.y += p.speedY;
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        const ps = particlesRef.current;
        for (let i = 0; i < ps.length; i++) {
          for (let j = i + 1; j < ps.length; j++) {
            const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              const alpha = 0.08 * (1 - dist / 100);
              ctx.beginPath();
              ctx.moveTo(ps[i].x, ps[i].y);
              ctx.lineTo(ps[j].x, ps[j].y);
              ctx.strokeStyle = `rgba(212,175,55,${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current);
      else rafRef.current = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
