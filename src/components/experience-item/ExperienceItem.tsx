"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ExperienceItemProps {
  dates: string;
  title: string;
  description: string;
  originDirection: string;
  tech1?: string;
  tech2?: string;
  tech3?: string;
  tech4?: string;
  tech5?: string;
  tech6?: string;
  link?: string;
}

export const ExperienceItem = ({ dates, title, description, originDirection, tech1, tech2, tech3, tech4, tech5, tech6, link }: ExperienceItemProps) => {

  const initialX = originDirection === "left" ? -300 : 300;

  return (
    <div>
      <Link href={link ? link : "#"}>
        <motion.div

          initial={{ opacity: 0, x: initialX, y: 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}

          whileHover={{ scale: 1.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, amount: "some" }}
          className={`bg-white dark:bg-neutral-800 rounded-2xl shadow p-6 mb-6 w-full lg:w-3/5 ${originDirection === "right" ? "ml-auto" : ""} disable-motion-sm`}

        >
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{dates}</p>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">{description}</p>
          <footer className="mt-2 flex flex-wrap">
            {/* <footer className="mt-2"> */}
            {tech1 && <span className="whitespace-nowrap text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech1}</span>}
            {tech2 && <span className="whitespace-nowrap text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech2}</span>}
            {tech3 && <span className="whitespace-nowrap text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech3}</span>}
            {tech4 && <span className="whitespace-nowrap text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech4}</span>}
            {tech5 && <span className="whitespace-nowrap text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech5}</span>}
            {tech6 && <span className="whitespace-nowrap text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech6}</span>}
          </footer>
        </motion.div>
      </Link>
    </div>
  );
};

