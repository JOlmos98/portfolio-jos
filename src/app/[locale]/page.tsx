// import { redirect } from "next/navigation";
// import { routing } from "@/i18n/routing"; // Importa la configuración de idiomas

// export default function Home() {
//   const defaultLocale = routing.defaultLocale; // Obtiene el idioma por defecto

//   redirect(`/${defaultLocale}/home`); // Redirige a la ruta correcta

// }


// import { Link, redirect } from '@/i18n/navigation';
// import {useTranslations} from 'next-intl';
 
// export default function HomePage() {
//   const t = useTranslations('HomePage');

//   redirect("/home");

//   return (
//     <div className="min-h-screen ">
//       <h1>{t('intro')}</h1>
//       <Link href="/home">home</Link>

//     </div>
//   );
// }

import { redirect } from "next/navigation"; // ✅ Usa el redirect de Next.js
import { routing } from "@/i18n/routing"; // Obtiene la configuración de idiomas

export default function HomePage() {
  const defaultLocale = routing.defaultLocale; // Obtiene el idioma por defecto

  redirect(`/${defaultLocale}/home`); // Redirige a "/en/home", "/es/home", etc.
}
