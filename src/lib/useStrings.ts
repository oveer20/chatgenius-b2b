"use client";
import { useLang } from "@/components/LangContext";

export function useStrings() {
  const { lang } = useLang();
  const isES = lang === "es";

  function s(es: string, en: string): string {
    return isES ? es : en;
  }

  return { lang, isES, s };
}
