import type { Metadata } from "next";
import SettingsPage from "./SettingsClient";

export const metadata: Metadata = {
  title: "Configuración | Stratix Intelligence",
  description: "Administra la configuración de tu cuenta Stratix.",
};

export default function SettingsPageWrapper() {
  return <SettingsPage />;
}
