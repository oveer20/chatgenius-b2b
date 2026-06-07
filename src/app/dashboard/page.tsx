import type { Metadata } from "next";
import DashboardPage from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | Stratix Intelligence",
  description: "Centro de control de agentes IA. Gestiona tus asistentes virtuales, leads y automatizaciones.",
};

export default function DashboardPageWrapper() {
  return <DashboardPage />;
}
