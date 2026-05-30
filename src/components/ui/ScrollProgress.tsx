"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) setProgress(Math.min(scrollTop / docHeight, 1));
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-0.5 z-50 bg-accent"
      style={{ width: `${progress * 100}%` }}
    />
  );
}
