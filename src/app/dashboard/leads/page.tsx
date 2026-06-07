import type { Metadata } from "next";
import LeadsDashboard from "./LeadsClient";

export const metadata: Metadata = {
  title: "Leads | Stratix Intelligence",
  description: "Gestiona y exporta tus leads capturados por los agentes IA.",
};

export default function LeadsPageWrapper() {
  return <LeadsDashboard />;
}
