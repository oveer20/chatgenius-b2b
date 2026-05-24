"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { FaInstagram, FaWhatsapp, FaFacebook, FaEnvelope, FaLinkedin } from "react-icons/fa";

const SOCIAL_LINKS = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/jose-gaviriap/", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://www.instagram.com/stratix.intelligence", label: "Instagram" },
  { icon: FaWhatsapp, href: "https://wa.me/573159269287", label: "WhatsApp" },
  { icon: FaFacebook, href: "https://www.facebook.com/share/1NAMx3GSWv/?mibextid=wwXIfr", label: "Facebook" },
  { icon: FaEnvelope, href: "mailto:stratixintelligence@gmail.com", label: "Email" },
];

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="relative z-[2] border-t border-white/6 bg-gradient-to-b from-bg/50 to-bg">
      <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)] pt-[clamp(3rem,8vw,5rem)] pb-0">
        <div className="grid grid-cols-[minmax(250px,2fr)_repeat(3,1fr)] gap-[clamp(2rem,5vw,4rem)]">
          <div>
            <div className="flex items-center gap-[10px] mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-accent to-[#b8860b] rounded-lg flex items-center justify-center text-lg font-bold text-black">
                S
              </div>
              <span className="font-mono text-[1.1rem] font-semibold text-text-primary">Stratix</span>
            </div>
            <p className="text-sm text-text-muted leading-[1.7] mb-6 max-w-[300px]">
              {lang === "es" ? "Automatiza tu atención y ventas con agentes IA. Responde 24/7 y cierra más negocios mientras descansas." : "Automate your support and sales with AI agents. Respond 24/7 and close more deals while you sleep."}
            </p>
            <div className="flex gap-[10px]">
              {SOCIAL_LINKS.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[38px] h-[38px] rounded-lg bg-white/4 border border-white/8 flex items-center justify-center text-text-muted no-underline transition-all duration-[0.3s] ease-in-out hover:bg-accent hover:text-black hover:border-accent"
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.12em] text-accent mb-5">
              {lang === "es" ? "PRODUCTO" : "PRODUCT"}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <Link href="#features" className="text-sm text-text-muted no-underline transition-colors duration-[0.2s] hover:text-text-primary">
                  {lang === "es" ? "Características" : "Features"}
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-sm text-text-muted no-underline transition-colors duration-[0.2s] hover:text-text-primary">
                  {lang === "es" ? "Precios" : "Pricing"}
                </Link>
              </li>
              <li>
                <Link href="#how" className="text-sm text-text-muted no-underline transition-colors duration-[0.2s] hover:text-text-primary">
                  {lang === "es" ? "Cómo funciona" : "How it works"}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-sm text-text-muted no-underline transition-colors duration-[0.2s] hover:text-text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.12em] text-accent mb-5">
              LEGAL
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <Link href="/legal/privacy" className="text-sm text-text-muted no-underline transition-colors duration-[0.2s] hover:text-text-primary">
                  {lang === "es" ? "Privacidad" : "Privacy"}
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-sm text-text-muted no-underline transition-colors duration-[0.2s] hover:text-text-primary">
                  {lang === "es" ? "Términos" : "Terms"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.12em] text-accent mb-5">
              CONTACTO
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <a href="https://wa.me/573159269287" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-text-muted no-underline transition-colors duration-[0.2s] hover:text-text-primary flex items-center gap-2">
                  <FaWhatsapp size={14} /> +57 315 926 9287
                </a>
              </li>
              <li>
                <a href="mailto:stratixintelligence@gmail.com"
                  className="text-sm text-text-muted no-underline transition-colors duration-[0.2s] hover:text-text-primary flex items-center gap-2">
                  <FaEnvelope size={14} /> stratixintelligence@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-[clamp(3rem,5vw,4rem)] py-6 border-t border-white/5 flex justify-between items-center flex-wrap gap-3"
        >
          <p className="text-[13px] text-text-muted font-mono">
            &copy; {new Date().getFullYear()} Stratix Intelligence. {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
          <p className="text-[13px] text-text-muted font-mono">
            {lang === "es" ? "Hecho con" : "Made with"} <span className="text-accent">&#9829;</span> {lang === "es" ? "en Colombia" : "in Colombia"}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
