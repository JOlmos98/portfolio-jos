"use client";

import React from "react";
import { motion } from "framer-motion";

interface EducationItemProps {
  dates: string;
  title: string;
  description: string;
  tech1?: string;
  tech2?: string;
  tech3?: string;
  tech4?: string;
  tech5?: string;
}

export const EducationItem = ({ dates, title, description, tech1, tech2, tech3, tech4, tech5 }: EducationItemProps) => {

    return (
        <div className="flex justify-center w-full mb-6"> {/* Centro global horizontal */}
      
          <div className="flex w-[80%] max-w-5xl items-center"> {/* Ancho limitado para que todo esté alineado al centro */}
      
            {/* Columna izquierda: Fecha */}
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.8 }}
              className="w-1/2 flex justify-end pr-4"
            >
              <p className="text-xl text-neutral-600 dark:text-neutral-300">{dates}</p>
            </motion.div>
      
            {/* Columna derecha: Contenido */}
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.8 }}
              className="w-1/2 bg-white dark:bg-neutral-800 rounded-2xl shadow p-6"
            >
              <h1 className="text-xl text-neutral-900 dark:text-white">{title}</h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">{description}</p>
            </motion.div>
      
          </div>
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