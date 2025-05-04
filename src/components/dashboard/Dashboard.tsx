"use client";

import { useTranslations } from "next-intl";
import { AsideDashboard } from './AsideDashboard';

export const Dashboard = () => {

    const t = useTranslations("Dashboard");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-[#121212] text-blue-cyan dark:text-blue-cyan">
      
      {/* Sidebar (fixed en desktop, oculto en móvil) */}
      <AsideDashboard />

      {/* Main content (debe compensar el sidebar fijo en desktop) */}
      <main className="flex-1 p-6 pt-24 ml-40 lg:ml-64">
      <h1 className="text-2xl font-bold mb-4">{t("WelcomeDashboard")}</h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          {t("IntroText")}
        </p>
      </main>
    </div>
  );
};


// "use client";

// import { useTranslations } from "next-intl";
// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import { Link } from "@/i18n/navigation";
// import { AsideDashboard } from './AsideDashboard';

// export const Dashboard = () => {
//   const { data: session } = useSession();
//   const t = useTranslations("Dashboard");

//   return (
//     <div className="flex min-h-screen bg-white dark:bg-[#121212] text-blue-cyan dark:text-blue-cyan">
//       <AsideDashboard />

//       <main className="flex-1 p-8 m-20">
//         <h1 className="text-2xl font-bold mb-4">{t("WelcomeDashboard")}</h1>
//         <p className="text-zinc-700 dark:text-zinc-300">
//           {t("IntroText")}
//         </p>
//       </main>
//     </div>
//   );
// };
