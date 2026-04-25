"use client";
import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  r: number;
  color: string;
  speed: number;
}

const ORBS: Orb[] = [
  { x: 0.15, y: 0.25, r: 0.35, color: "rgba(0,229,160,0.07)",  speed: 0.00008 },
  { x: 0.85, y: 0.15, r: 0.28, color: "rgba(0,180,255,0.05)",  speed: 0.00006 },
  { x: 0.5,  y: 0.75, r: 0.4,  color: "rgba(0,229,160,0.04)",  speed: 0.00005 },
  { x: 0.75, y: 0.6,  r: 0.25, color: "rgba(120,80,255,0.04)", speed: 0.00007 },
];

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const tRef      = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      tRef.current += 1;
      const t = tRef.current;

      ORBS.forEach((o, i) => {
        const angle = t * o.speed * 1000 + i * 1.5;
        const ox = (o.x + Math.sin(angle) * 0.08) * W;
        const oy = (o.y + Math.cos(angle * 0.7) * 0.06) * H;
        const r  = o.r * Math.min(W, H);
        const g  = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        g.addColorStop(0, o.color);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 1;
      const gs = 80;
      for (let x = 0; x < W; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
