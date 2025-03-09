import { redirect } from "next/navigation"; // ✅ Usa el redirect de Next.js
import { routing } from "@/i18n/routing"; // Obtiene la configuración de idiomas

export default function HomePage() {
  const defaultLocale = routing.defaultLocale; // Obtiene el idioma por defecto

  redirect(`/${defaultLocale}/home`); // Redirige a "/en/home", "/es/home", etc.
}
