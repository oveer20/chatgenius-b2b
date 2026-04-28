"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function WhatsAppStickyMobile() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide when scrolling up, show when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Only show on mobile */}
      <style>{`
        @media (min-width: 769px) {
          .whatsapp-sticky-mobile { display: none !important; }
        }
      `}</style>
      <motion.a
        href={WHATSAPP_URL}
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="whatsapp-sticky-mobile"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.5)",
          cursor: "pointer",
          zIndex: 9998,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.1-.471-.149-.669.149-.198.297-.767.966-.94 1.164-.173.198-.347.223-.643.074-.297-.149-.528-.521-.628-.607-.1-.173-.413-.198-.6-.1-.572.521-1.903.627-2.314.363-.297-.198-.59-.347-.872-.347-.348 0-.748.074-.998.371-.198.248-.297.595-.198.926l.042 1.767c.198.297.595.818 1.613 1.452 1.038.647 2.18.992 3.437 1.145.42.053.822.042 1.13.042.198 0 .495-.025.714-.074.248-.074.595-.173.892-.371l.521-.272c.248-.148.42-.37.545-.595l.074-.42c.049-.173.025-.347-.025-.521z" fill="#fff"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.372 1.38 4.477 3.515 5.83L3.258 21.472l3.94-1.034c1.318.682 2.82 1.042 4.358 1.042 6.627 0 12-5.373 12-12S18.627 0 12 0zm-5.5 6.5c0-3.033 2.468-5.5 5.5-5.5 3.032 0 5.5 2.467 5.5 5.5 0 3.032-2.468 5.5-5.5 5.5-3.033 0-5.5-2.468-5.5-5.5z" fill="#fff"/>
        </svg>
      </motion.a>
    </>
  );
}