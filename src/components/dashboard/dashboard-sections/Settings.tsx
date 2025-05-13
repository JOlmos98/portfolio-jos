"use client";

import { useTranslations } from 'next-intl';
import React from 'react'

export const Settings = () => {

    const t = useTranslations("Dashboard");

    return (
        <div>
            <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80">
                <h1 className="text-4xl font-bold mb-4">{t("Settings")}</h1>
                <p className="text-zinc-700 dark:text-zinc-300 text-xl">
                    {t("SettingsText")}
                </p>
            </main>
        </div>
    )
}
