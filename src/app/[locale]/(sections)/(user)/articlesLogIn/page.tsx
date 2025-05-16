"use server";

import { ButtonAuth } from "@/components";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function ÀrticlesPage() {

    const t = await getTranslations("Articles");

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-38">
                <div>

                    <div className="container mx-auto">
                        <h1 className="text-center text-5xl font-bold mb-24">{t("Articles")}</h1>
                    </div>
                    <div>
                        <p className="text-4xl max-w-[700px]">{t("To access the Articles page, you must be")}
                            <span className="text-blue-cyan">{t("logged in")}</span>
                            {t("Please")}
                            <span className="text-blue-cyan"><Link href={"/login"}>{t("log in")}</Link></span>
                            {t("or")}
                            <span className="text-blue-cyan"><Link href={"/signUp"}>{t("sign up")}</Link></span>
                            {t("if you haven't already")}
                        </p>
                    </div>
                    {/* <div className="mt-24 flex justify-center text-2xl"> */}
                    <div className="flex space-x-4 mt-24 items-center justify-center">
                        <ButtonAuth />
                    </div>
                </div>
            </div>
        </div>
    );
}