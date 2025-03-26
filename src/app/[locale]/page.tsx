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
          <h1 className="text-4xl bg-transparent mt-44 mb-8">Experience</h1>
          <ExperienceItem dates="2024 - Present" originDirection="left" tech1="Next.js" tech2="TypeScript" tech3="Tailwind CSS" title="Desarrollador backend junior · CTICONTROL" description="Desarrollo de software agrícola y ganadero para control de clima basado en modelos antiguos de la propia empresa construidos sobre microcontroladores en C. " />

          <ExperienceItem dates="2026 - Present" originDirection="right" tech1="Unity" tech2="C#" tech3="Blender" title="Desarrollador de videojuegos indie · Wolf King Studios" description="Desarrollo de videojuegos indie de corta duración con Unity." />

          <ExperienceItem dates="2026 - Present" originDirection="left" tech1="Spring Boot" tech2="Java" title="Desarrollador backend · NTT Data" description="Desarrollo backend de aplicaciones web." />

          {/* <ExperienceItem dates="2022 - Present" originDirection="left" title="Inginiero de software junior · CTICONTROL" description="Desarrollo de software agrícola y ganadero basado en modelos antiguos de la propia empresa construidos sobre microcontroladores en C." />
          <ExperienceItem dates="2022 - Present" originDirection="right" title="Inginiero de software junior · CTICONTROL" description="Desarrollo de software agrícola y ganadero basado en modelos antiguos de la propia empresa construidos sobre microcontroladores en C." /> */}

        </div>
        <p className="text-3xl mt-32 mb-8">Puedes saber más cosas sobre mí, completamente innecesarias, <Link href="/moreAboutMe" className="text-blue-cyan hover:text-cyan-300">aquí</Link>.</p>
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