import type { Metadata } from "next";
import NewBotPage from "./NewBotClient";

export const metadata: Metadata = {
  title: "Crear Agente | Stratix Intelligence",
  description: "Crea un nuevo agente de ventas IA.",
};

export default function NewBotPageWrapper() {
  return <NewBotPage />;
}
