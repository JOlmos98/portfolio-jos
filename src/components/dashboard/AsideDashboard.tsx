"use client";

import React from 'react'
import Image from 'next/image'
import { Link } from "@/i18n/navigation";
import { useSession, signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export const AsideDashboard = () => {

  const { data: session } = useSession();
  const t = useTranslations("Dashboard");
  const pathname = usePathname();
//   const admin = session !== null ? (session.user?.email !== "soler98@hotmail.es" ? false : true) : false;
// console.warn("==================== admin = ", admin);

  return (
    <aside className="w-30 lg:w-64 bg-gray-200 dark:bg-[#1a1a1a] p-2 lg:p-6 flex flex-col gap-4 shadow-xl h-full lg:h-screen fixed top-0 left-0">

      <Link href={"/dashboard"}>
        <div className="mt-20 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3">
          <Image
            src={typeof session?.user?.avatarUrl === "string" ? session.user.avatarUrl : "https://i.imgur.com/bGW4oJg.png"}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full self-center lg:self-start"
          />
          <div className="text-center lg:text-left">
            <p className="font-bold">{session?.user?.name}</p>
            <p className="text-[10px] lg:text-sm text-zinc-500 dark:text-zinc-400">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </Link>

      <nav className="flex flex-col gap-3 mt-8 text-sm lg:text-xl w-24 lg:w-52">
        <Link href="/dashboard/savedArticles" className={pathname.includes("dashboard/savedArticles") ? "text-blue-cyan hover:text-cyan-500" : "text-black dark:text-gray-300 hover:text-blue-cyan"}>
          {t("SavedArticles")}
        </Link>
        <Link href="/dashboard/newArticle" className={pathname.includes("dashboard/newArticle") ? "text-blue-cyan hover:text-cyan-500" : "text-black dark:text-gray-300 hover:text-blue-cyan"}>
          {t("NewArticle")}
        </Link>
        <Link href="/dashboard/settings" className={pathname.includes("dashboard/settings") ? "text-blue-cyan hover:text-cyan-500" : "text-black dark:text-gray-300 hover:text-blue-cyan"}>
          {t("Settings")}
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-left text-red-600 hover:text-red-400"
        >
          {t("SignOut")}
        </button>
      <div className='flex fixed bottom-0 mb-5'>
        <Link href="/dashboard/admin" className={pathname.includes("dashboard/admin") ? "text-blue-cyan hover:text-cyan-500" : "text-black dark:text-gray-300 hover:text-blue-cyan"}>
          {t("Admin")}
        </Link>
        </div>
      </nav>
    </aside>
  );
}



// import React from 'react'
// import Image from 'next/image'
// import { Link } from "@/i18n/navigation";
// import { useSession, signOut } from 'next-auth/react';
// import { useTranslations } from 'next-intl';
// import { usePathname } from 'next/navigation';

// export const AsideDashboard = () => {

//     const { data: session } = useSession();
//     const t = useTranslations("Dashboard");
//     const pathname = usePathname();

//     return (
//         <div>
//             <aside className="w-64 bg-gray-100 dark:bg-[#1a1a1a] p-6 flex flex-col gap-4 mt-20 shadow-xl h-full">
//                 <div className="flex items-center gap-3">
//                     <Image
//                         src={typeof session?.user?.avatarUrl === "string" ? session.user.avatarUrl : "https://i.imgur.com/bGW4oJg.png"}
//                         alt="Avatar"
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                     />
//                     <div>
//                         <p className="font-bold">{session?.user?.name}</p>
//                         <p className="text-sm text-zinc-500 dark:text-zinc-400">
//                             {session?.user?.email}
//                         </p>
//                     </div>
//                 </div>

//                 <nav className="flex flex-col gap-3 mt-8 text-xl">
//                     <Link href="/dashboard/articles" className={pathname.includes("dashboard/articles") ? "text-blue-cyan hover:text-cyan-500": "text-gray-300 hover:text-blue-cyan"}>
//                         {t("SavedArticles")}
//                     </Link>
//                     <Link href="/dashboard/new" className={pathname.includes("dashboard/new") ? "text-blue-cyan hover:text-cyan-500": "text-gray-300 hover:text-blue-cyan"}>
//                         {t("NewArticle")}
//                     </Link>
//                     <Link href="/dashboard/settings" className={pathname.includes("dashboard/settings") ? "text-blue-cyan hover:text-cyan-500": "text-gray-300 hover:text-blue-cyan"}>
//                         {t("Settings")}
//                     </Link>
//                     {/* <Link href="/dashboard/profile" className={pathname.includes("dashboard/profile") ? "text-blue-cyan hover:text-cyan-500": "text-gray-300 hover:text-blue-cyan"}>
//                         {t("Profile")}
//                     </Link> */}
//                     <button
//                         onClick={() => signOut({ callbackUrl: "/" })}
//                         className="text-left text-red-600 hover:text-red-400"
//                     >
//                         {t("SignOut")}
//                     </button>
//                 </nav>
//             </aside>
//         </div>
//     )
// }

