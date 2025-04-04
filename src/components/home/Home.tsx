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
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <Image className="" src="/jos.png" alt="jos" width={360} height={76} priority />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.8 }}
        className="text-lg sm:max-w-xl"
      >
        {t("intro")}
      </motion.p>
    </div>
  );
};
