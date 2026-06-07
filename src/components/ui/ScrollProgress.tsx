"use client";

import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

export default function ScrollProgress() {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) scrollY.set(Math.min(scrollTop / docHeight, 1));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  const scaleX = useTransform(scrollY, [0, 1], [0, 1]);
  const springScaleX = useSpring(scaleX, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-50 origin-left bg-accent"
      style={{ scaleX: springScaleX }}
    />
  );
}
