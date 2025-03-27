"use server";

import { ExperienceItem } from "@/components/experience-item/ExperienceItem";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Home } from "@/components/home/Home";

export default async function HomePage() {

  const t = await getTranslations("HomePage");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">

      <div className="flex flex-col row-start-2 items-center sm:items-start mt-20">
        <h1 className="text-4xl font-bold bg-transparent"></h1>
        <div>
          <Home />
        </div>
        <div>
          <h1 className="text-4xl bg-transparent mt-44 mb-8">{t("experienceTitle")}</h1>

          <ExperienceItem
            dates={t("experience1.dates")}
            originDirection="left"
            tech1={t("experience1.tech1")}
            tech2={t("experience1.tech2")}
            tech3={t("experience1.tech3")}
            title={t("experience1.title")}
            description={t("experience1.description")}
          />

          <ExperienceItem
            dates={t("experience2.dates")}
            originDirection="right"
            tech1={t("experience2.tech1")}
            tech2={t("experience2.tech2")}
            tech3={t("experience2.tech3")}
            title={t("experience2.title")}
            description={t("experience2.description")}
          />

          <ExperienceItem
            dates={t("experience3.dates")}
            originDirection="left"
            tech1={t("experience3.tech1")}
            tech2={t("experience3.tech2")}
            title={t("experience3.title")}
            description={t("experience3.description")}
          />
        </div>

        <p className="text-3xl mt-32 mb-8">
          {t("toMoreAboutMe")}{" "}
          <Link href="/moreAboutMe" className="text-blue-cyan hover:text-cyan-300">
            aquí
          </Link>.
        </p>
      </div>
    </div>
  );
}
//Entre otras cosas, aprendí todo lo relacionado con las bases de datos, modelos entidad relación, SQL, PL/SQL, por otro lado profundicé en Java manejando hilos con semáforos, multihilo, etc. También aprendí a manejar ciertosmódulos de Spring Boot como Spring Data JPA.

/*
        <div className="flex flex-col sm:flex-row items-center gap-8"> 
        <Image className="" src="/jos.png" alt="jos" width={360} height={76} priority />
        <p className="text-lg sm:max-w-xl">{t('intro')}</p>
      </div>
*/