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

      <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-44">
        <h1 className="text-4xl font-bold bg-transparent"></h1>
        <div>
          <Home />
        </div>
        <div>
          <h1 className="text-4xl bg-transparent mt-44 mb-8 font-bold">{t("experienceTitle")}</h1>

          <ExperienceItem
            dates={t("experience2.dates")}
            title={t("experience2.title")}
            description={t("experience2.description")}
            originDirection="right"
            tech1="Unity"
            tech2="C#"
            tech3="Blender"
            tech4="Phaser"
            tech5="Aseprite"
          />

          <ExperienceItem
            dates={t("experience1.dates")}
            title={t("experience1.title")}
            description={t("experience1.description")}
            originDirection="left"
            tech1="Next.js"
            tech2="TypeScript"
            tech3="Tailwind CSS"
            tech4="NestJS"
            link="https://www.cticontrol.com/en/"
          />

          {/* <ExperienceItem
            dates={t("experience3.dates")}
            title={t("experience3.title")}
            description={t("experience3.description")}
            originDirection="left"
            tech1="Spring Boot"
            tech2="Java"
            link="https://es.nttdata.com/"
          /> */}
        </div>

        <h1 className="text-4xl bg-transparent mt-44 mb-8 font-bold">{t("projectsTitle")}</h1>

        <ProjectItem
          year="2025"
          title={t("project1.title")}
          description={t("project1.description")}
          tech1="Nextj.js"
          tech2="TypeScript"
          tech3="Tailwind CSS"
          tech4="Drizzle"
          tech5="Supabase"
          imgUrl="https://i.imgur.com/omXb83c.png"
          link="https://github.com/JOlmos98/portfolio-jos"
        />

        <ProjectItem
          year="2025"
          title={t("project2.title")}
          description={t("project2.description")}
          tech1="Nextj.js"
          tech2="TypeScript"
          tech3="Tailwind CSS"
          tech4="Tauri"
          tech5="Rust"
          tech6="SQLite"
          imgUrl="https://i.imgur.com/9e65ODL.png"
          link="https://github.com/JOlmos98/dbms-art-gallery"
        />

        <ProjectItem
          year="2024"
          title={t("project3.title")}
          description={t("project3.description")}
          tech1="Java"
          tech2="Android Studio"
          imgUrl="https://i.imgur.com/jQDP8Ka.png"
          link="https://github.com/JOlmos98/calculator-androidstudio"
        />

        <p className="w-full text-xl mt-5 mb-8 text-center px-4 sm:px-8">
          {t("toMoreAboutMe")}{" "}
          <Link href="/projects" className="text-blue-cyan hover:text-cyan-300">
            {t("linkProjects")}
          </Link>.
        </p>
      </div>
    </div>
  );
}

/*
        <div className="flex flex-col sm:flex-row items-center gap-8"> 
        <Image className="" src="/jos.png" alt="jos" width={360} height={76} priority />
        <p className="text-lg sm:max-w-xl">{t('intro')}</p>
      </div>
*/