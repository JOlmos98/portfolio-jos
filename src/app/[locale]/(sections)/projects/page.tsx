"use server";

import { ProjectItem } from "@/components";
import { getTranslations } from "next-intl/server";

export default async function ProjectsPage() {

  const t = await getTranslations("HomePage");
  const p = await getTranslations("HomePage.projectsIntro");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-38">
        <div>
          <h1 className="text-center mx-auto text-xl lg:text-4xl w-2/3 bg-transparent mt-8 mb-12 font-bold">
            {p("main")}
            <span className="text-blue-cyan dark:text-blue-cyan">{p("learn")}</span>
            {p("continue")}
            <span className="text-blue-cyan dark:text-blue-cyan">{p("skills")}</span>
            {p("and")}
            <span className="text-blue-cyan dark:text-blue-cyan">{p("creativity")}</span>
            {p("end")}
          </h1>
          
          <ProjectItem
            year="2025"
            title={t("project1.title")}
            description={t("project1.description")}
            tech1="Nextj.js"
            tech2="TypeScript"
            tech3="Tailwind CSS"
            tech4="Supabase"
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
        </div>
      </div>
    </div>
  );
}