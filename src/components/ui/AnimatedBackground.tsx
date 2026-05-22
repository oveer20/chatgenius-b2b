"use client";
import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

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

      const gradient = ctx.createLinearGradient(0, 0, W, H);
      gradient.addColorStop(0, "#070910");
      gradient.addColorStop(0.5, "#0a0f1a");
      gradient.addColorStop(1, "#070910");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      const time = Date.now() * 0.0001;
      const ox = W * 0.5 + Math.sin(time) * 100;
      const oy = H * 0.5 + Math.cos(time * 0.7) * 50;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, Math.min(W, H) * 0.4);
      g.addColorStop(0, "rgba(212,175,55,0.05)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("visibilitychange", onVisibility);
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
