import type { Metadata } from "next";
import OutreachDashboard from "./OutreachClient";

export const metadata: Metadata = {
  title: "Outreach | Stratix Intelligence",
  description: "Campanas de outreach automatizadas con IA.",
};

export default function OutreachPageWrapper() {
  return <OutreachDashboard />;
}
