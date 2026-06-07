import type { Metadata } from "next";
import WidgetPage from "./WidgetClient";

export const metadata: Metadata = {
  title: "Widget Chat | Stratix Intelligence",
  description: "Widget de chat IA para tu sitio web.",
};

export default function WidgetPageWrapper() {
  return <WidgetPage />;
}
