"use client";

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import React from 'react'

export const HomeDashboard = () => {

    const t = useTranslations("Dashboard");

    return (
        <div>
            <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80">
                <h1 className="text-4xl font-bold mb-4">{t("WelcomeDashboard")}</h1>
                <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-10">{t("IntroText")}</p>

                <h2 className="text-2xl font-bold mb-2"><Link href={"/dashboard/savedArticles"}>· {t("SavedArticles")}</Link></h2>
                <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-10">{t("SavedArticleTextHome")}</p>
                <h2 className="text-2xl font-bold mb-2"><Link href={"/dashboard/newArticle"}>· {t("NewArticle")}</Link></h2>
                <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-10">{t("NewArticleTextHome")}</p>
                <h2 className="text-2xl font-bold mb-2"><Link href={"/dashboard/settings"}>· {t("Settings")}</Link></h2>
                <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-10">{t("SettingsTextHome")}</p>
            </main>
        </div>
    )
}

