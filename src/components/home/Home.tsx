"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Home = () => {
  
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8">
      <motion.div
      className="disable-motion-sm"
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: "some" }}
      >
        <Image className="" src="/jos.png" alt="jos" width={360} height={76} priority />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: "some" }}
        className="text-lg sm:max-w-2xl break-words disable-motion-sm"
      >
        {t("intro")}
      </motion.p>
    </div>
  );
};
