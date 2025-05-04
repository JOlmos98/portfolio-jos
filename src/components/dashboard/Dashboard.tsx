// "use client";

// import { AsideDashboard } from './AsideDashboard';
// import { HomeDashboard } from './dashboard-sections/HomeDashboard';

// export const Dashboard = () => {

//     return (
//         <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-[#121212] text-blue-cyan dark:text-blue-cyan">
//             <AsideDashboard />
//             <HomeDashboard />
//         </div>
//     );
// };



//! OLD
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
