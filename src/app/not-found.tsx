"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="bg-bg min-h-screen flex flex-col items-center justify-center text-text-primary font-sans p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mb-8">
          <div className="w-[100px] h-[100px] bg-accent/10 rounded-3xl flex items-center justify-center border border-accent/20">
            <Image src="/stratix_shield.svg" alt="Stratix Shield" width={60} height={60} />
          </div>
        </div>

        <h1 className="text-8xl font-black text-accent mb-4 tracking-[-4px]">404</h1>
        <h2 className="text-[2rem] font-extrabold mb-6">Arquitectura No Encontrada</h2>
        <p className="opacity-50 text-lg max-w-[500px] mx-auto mb-12 leading-relaxed">
          El recurso solicitado no existe en nuestro clúster actual. Es posible que la página haya sido movida o aún esté en fase de despliegue.
        </p>

        <Link href="/" className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-black rounded-xl no-underline font-black shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all duration-300">
          <FiArrowLeft /> Regresar a la Base
        </Link>
      </motion.div>

      <div className="absolute bottom-8 opacity-20 text-xs tracking-[2px]">
        STRATIX INTELLIGENCE — SECURE PROTOCOL
      </div>
    </div>
  );
}
