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
    <div className="lg:w-full max-w-4xl mx-auto">
      <Link href={link ? link : "#"}>
        <motion.div
          initial={{ opacity: 0, x: 0, y: 200 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.9, ease: "easeOut" }}
          viewport={{ once: true, amount: "some" }}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-6 mb-6 w-full overflow-hidden disable-motion-sm"
        >
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{dates}</p>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{title}</h3>

          <div className="mt-4 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-full sm:w-auto sm:flex-shrink-0">
              <Image
                className="w-full sm:w-60 h-40 object-cover rounded-2xl"
                src={imgUrl ? imgUrl : "/jos.png"}
                alt={title}
                width={240}
                height={160}
                priority
              />
            </div>
            <p className="text-base text-neutral-700 dark:text-neutral-300 mt-4 sm:mt-0">
              {description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap">
            {tech1 && <span className="inline-block whitespace-nowrap text-sm mr-2 mb-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan">{tech1}</span>}
            {tech2 && <span className="inline-block whitespace-nowrap text-sm mr-2 mb-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan">{tech2}</span>}
            {tech3 && <span className="inline-block whitespace-nowrap text-sm mr-2 mb-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan">{tech3}</span>}
            {tech4 && <span className="inline-block whitespace-nowrap text-sm mr-2 mb-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan">{tech4}</span>}
            {tech5 && <span className="inline-block whitespace-nowrap text-sm mr-2 mb-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan">{tech5}</span>}
            {tech6 && <span className="inline-block whitespace-nowrap text-sm mr-2 mb-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan">{tech6}</span>}
          </div>
        </motion.div>
      </Link>
    </div>
  );
};
