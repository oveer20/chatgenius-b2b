import type { Metadata } from "next";
import WelcomeWizard from "./OnboardingClient";

export const metadata: Metadata = {
  title: "Onboarding | Stratix Intelligence",
  description: "Configura tu cuenta y despliega tu primer agente IA.",
};

export default function OnboardingPageWrapper() {
  return <WelcomeWizard />;
}
