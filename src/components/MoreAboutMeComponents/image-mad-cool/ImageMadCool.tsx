"use client";

import React from "react";
import ImageWithFooter from "../image-with-footer/ImageWithFooter";
import { useTranslations } from "next-intl";

export const ImageMadCool = () => {

    const m = useTranslations("MoreAboutMe");

    return (
        <div>
            <div className="text-center block mx-auto">
                <ImageWithFooter className="block mx-auto rounded-2xl transition" src="https://i.imgur.com/F31PIP7.jpeg" alt="jos" width={360} height={76} priority text={m("img1")} />
            </div>
        </div>
    )
};

{/* <motion.div
    className="disable-motion-sm"
    initial={{ opacity: 0, x: 0, y: 0 }}
    whileInView={{ opacity: 1, x: 0 }}
    whileHover={{ scale: 1.2 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    viewport={{ once: true, amount: "some" }}
    > */}

{/* </motion.div> */ }

// <div>
//   <Link href={link ? link : "#"}>
//     <motion.div

//       initial={{ opacity: 0, x: initialX, y: 0 }}
//       whileInView={{ opacity: 1, x: 0, y: 0 }}

//       whileHover={{ scale: 1.2 }}
//       transition={{ duration: 1.5, ease: "easeOut" }}
//       viewport={{ once: true, amount: "some" }}
//       className={`bg-white dark:bg-neutral-800 rounded-2xl shadow p-6 mb-6 w-full lg:w-3/5 ${originDirection === "right" ? "ml-auto" : ""} disable-motion-sm`}

//     ></motion.div>