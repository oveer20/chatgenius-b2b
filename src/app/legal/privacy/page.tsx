import type { Metadata } from "next";
import PrivacyPolicy from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Política de Privacidad | Stratix Intelligence",
  description: "Política de privacidad de Stratix Intelligence.",
};

export default function PrivacyPageWrapper() {
  return <PrivacyPolicy />;
}
