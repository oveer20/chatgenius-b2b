import type { Metadata } from "next";
import AuthPage from "./LoginClient";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Stratix Intelligence",
  description: "Accede a tu dashboard Stratix Intelligence.",
};

export default function LoginPageWrapper() {
  return <AuthPage />;
}
