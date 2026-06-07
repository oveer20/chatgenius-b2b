import type { Metadata } from "next";
import TermsOfService from "./TermsClient";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Stratix Intelligence",
  description: "Términos y condiciones de uso de Stratix Intelligence.",
};

export default function TermsPageWrapper() {
  return <TermsOfService />;
}
