import { DashboardShell } from "./DashboardShell";

export const metadata = {
  title: "Dashboard | Stratix Intelligence",
  description: "Centro de control de agentes IA",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
