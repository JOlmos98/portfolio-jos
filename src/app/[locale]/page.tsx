"use server";

import { ExperienceItem } from "@/components/experience-item/ExperienceItem";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Home } from "@/components/home/Home";
import { ProjectItem } from "@/components";

export default async function HomePage() {

  const t = await getTranslations("HomePage");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">

      <div className="flex flex-col row-start-2 items-center sm:items-start mt-20 lg:mt-44">
        <h1 className="text-4xl font-bold bg-transparent"></h1>
        <div>
          <Home />
        </div>
        <div>
          <h1 className="text-4xl bg-transparent mt-44 mb-8 font-bold">{t("experienceTitle")}</h1>

          <ExperienceItem
            dates={t("experience1.dates")}
            originDirection="left"
            tech1={t("experience1.tech1")}
            tech2={t("experience1.tech2")}
            tech3={t("experience1.tech3")}
            title={t("experience1.title")}
            description={t("experience1.description")}
            link="https://www.cticontrol.com/en/"
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
            link="https://es.nttdata.com/"
          />
        </div>

        <h1 className="text-4xl bg-transparent mt-44 mb-8 font-bold">Proyectos</h1>

        <ProjectItem
          year="2025"
          title="Portfolio web"
          description="Desarrollo de un portfolio web profesional con Next.js. Proyecto de gin de grado (TFG) para el Grado Superior en Desarrollo de Aplicaciones Multiplataforma en IES JLMP."
          tech1="Nextj.js"
          tech2="TypeScript"
          tech3="Tailwind CSS"
          tech4="Supabase"
          imgUrl="https://i.imgur.com/omXb83c.png"
        />

        <ProjectItem
          year="2025"
          title="SGBD Galería de Arte"
          description="Sistema gestor de base de datos para una galería de arte. Backend en Rust (Tauri) y frontend con Next.js usando shadcn."
          tech1="Nextj.js"
          tech2="TypeScript"
          tech3="Tailwind CSS"
          tech4="Tauri"
          tech5="Rust"
          tech6="SQLite"
          imgUrl="https://i.imgur.com/9e65ODL.png"
        />

        <ProjectItem
          year="2024"
          title="Calculadora"
          description="Calculadora funcional básica desarrollada en Android Studio. Proyecto realizado como tarea de una de las asignaturas del Grado Superior en DAM."
          tech1="Java"
          tech2="Android Studio"
          imgUrl="https://i.imgur.com/jQDP8Ka.png"
        />

        <p className="w-full text-xl mt-5 mb-8 text-center">
          {t("toMoreAboutMe")}{" "}
          <Link href="/moreAboutMe" className="text-blue-cyan hover:text-cyan-300">
          {t("linkMoreAboutMe")}
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