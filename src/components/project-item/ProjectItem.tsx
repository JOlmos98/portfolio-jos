"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ProjectItemProps {
  year: string;
  title: string;
  description: string;
  tech1?: string;
  tech2?: string;
  tech3?: string;
  tech4?: string;
  tech5?: string;
  tech6?: string;
  link?: string;
  imgUrl?: string;
}

export const ProjectItem = ({ year: dates, title, description, tech1, tech2, tech3, tech4, tech5, tech6, link, imgUrl }: ProjectItemProps) => {

  return (
    <div className="">
      <Link href={link ? link : "#"}>
        <motion.div
          initial={{ opacity: 0, x: 0, y: 200 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}

          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.9, ease: "easeOut" }}
          viewport={{ once: true, amount: "some" }}
          className={`bg-white dark:bg-neutral-800 rounded-2xl shadow p-6 mb-6 w-full`}
        >

          <p className="text-sm text-neutral-600 dark:text-neutral-300">{dates}</p>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{title}</h3>


          <div className="p-6 flex flex-row items-start gap-6 flex-wrap">
            <Image
              className="w-60 h-40 object-cover rounded-2xl"
              src={imgUrl ? imgUrl : "/jos.png"}
              alt="jos"
              width={360}
              height={240}
              priority
            />
            <p className="text-base text-neutral-700 dark:text-neutral-300 max-w-2xl">
              {description}
            </p>
          </div>

          <footer className="mt-1">
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


/*

      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">{description}</p>
      <footer className="mt-2">
        {tech1 && <span className="text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech1}</span>}
        {tech2 && <span className="text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech2}</span>}
        {tech3 && <span className="text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech3}</span>}
        {tech4 && <span className="text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech4}</span>}
        {tech5 && <span className="text-sm mr-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan mt-2">{tech5}</span>}
      </footer>

*/