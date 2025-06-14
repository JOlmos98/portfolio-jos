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
  // const admin = session !== null ? (session.user?.email !== "soler98@hotmail.es" ? false : true) : false;
  // console.warn("==================== admin = ", admin);

  const email = session!.user!.email!.length > 18 ? session!.user!.email!.substring(0, 18) + "..." : session!.user!.email;

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
            <p className="text-[10px] lg:text-xs text-zinc-500 dark:text-zinc-400">
              {email}
            </p>
          </div>
        </div>
      </Link>

      <nav className="flex flex-col gap-3 mt-8 text-sm lg:text-xl w-24 lg:w-52">
        <Link href="/dashboard/savedArticles" className={pathname.includes("dashboard/savedArticles") ? "text-blue-cyan hover:text-cyan-500 dark:hover:text-cyan-500" : "text-black dark:text-gray-300 hover:text-blue-cyan dark:hover:text-blue-cyan"}>
          {t("SavedArticles")}
        </Link>
        <Link href="/dashboard/newArticle" className={pathname.includes("dashboard/newArticle") ? "text-blue-cyan hover:text-cyan-500 dark:hover:text-cyan-500" : "text-black dark:text-gray-300 hover:text-blue-cyan dark:hover:text-blue-cyan"}>
          {t("NewArticle")}
        </Link>
        <Link href="/dashboard/settings" className={pathname.includes("dashboard/settings") ? "text-blue-cyan hover:text-cyan-500 dark:hover:text-cyan-500" : "text-black dark:text-gray-300 hover:text-blue-cyan dark:hover:text-blue-cyan"}>
          {t("Settings")}
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-left text-red-600 hover:text-red-400"
        >
          {t("SignOut")}
        </button>
        <div className='flex fixed bottom-0 mb-5'>
          <Link href="/dashboard/admin" className={`hover:text-cyan-500 dark:hover:text-cyan-500 ${pathname.includes("dashboard/admin") ? "text-blue-cyan" : "text-black dark:text-gray-300"}`}>
            {t("Admin")}
          </Link>
        </div>
      </nav>
    </aside>
  );
}
