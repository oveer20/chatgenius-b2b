"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX - 3 + "px";
      dot.style.top = e.clientY - 3 + "px";
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('input');
      setIsHover(!!isInteractive);
    };

    const handleMouseDown = () => setIsClick(true);
    const handleMouseUp = () => setIsClick(false);

    let animationId: number;
    const animate = () => {
      const { x, y } = positionRef.current;
      const dx = targetRef.current.x - x;
      const dy = targetRef.current.y - y;
      
      positionRef.current.x = x + dx * 0.5;
      positionRef.current.y = y + dy * 0.5;

      if (cursor) {
        cursor.style.left = (positionRef.current.x - 15) + "px";
        cursor.style.top = (positionRef.current.y - 15) + "px";
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile, isHover, isClick]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed rounded-full pointer-events-none z-[99999] transition-all duration-150 ${
          isClick ? "w-[50px] h-[50px]" : isHover ? "w-[40px] h-[40px]" : "w-[30px] h-[30px]"
        } ${
          isHover
            ? "border-2 border-[rgba(212,175,55,0.9)]"
            : "border border-[rgba(212,175,55,0.5)]"
        }`}
      />
      <div
        ref={dotRef}
        className="fixed w-[6px] h-[6px] rounded-full bg-accent pointer-events-none z-[100000]"
      />
    </>
  );
}
