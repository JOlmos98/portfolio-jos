"use server";

import { ImageBooks } from "@/components/MoreAboutMeComponents/image-books/ImageBooks";
import { ImageMadCool } from "@/components/MoreAboutMeComponents/image-mad-cool/ImageMadCool";
import { getTranslations } from "next-intl/server";

export default async function MoreAboutMePage() {

  const t = await getTranslations("Navbar");
  const m = await getTranslations("MoreAboutMe");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-38">
        <div>
          <h1 className="text-center mx-auto text-xl lg:text-4xl w-2/3 bg-transparent mt-8 mb-12">
            {/* {p("main")} */}
            <p className="text-5xl text-blue-cyan">{t("moreAboutMe")}</p>
          </h1>
          <p className="text mx-auto text-xl lg:text-3xl w-full sm:w-2/3 bg-transparent mt-8 mb-12">{m("p1")}</p>
          <p className="text mx-auto text-xl lg:text-3xl w-full sm:w-2/3 bg-transparent mt-8 mb-12">{m("p2")}</p>
          <ImageMadCool />
          <p className="text mx-auto text-xl lg:text-3xl w-full sm:w-2/3 bg-transparent mt-8 mb-12">{m("p3")}</p>
          <p className="text mx-auto text-xl lg:text-3xl w-full sm:w-2/3 bg-transparent mt-8 mb-12">{m("p4")}</p>
          <ImageBooks />
          <p className="text mx-auto text-xl lg:text-3xl w-full sm:w-2/3 bg-transparent mt-8 mb-12">{m("p5")}</p>
          <p className="text mx-auto text-xl lg:text-3xl w-full sm:w-2/3 bg-transparent mt-8 mb-12">{m("p6")}</p>
        </div>
      </div>
    </div>
  );
}

// import Image from "next/image";
// import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/navigation";
// import ImageWithFooter from '../../../../components/MoreAboutMeComponents/image-with-footer/ImageWithFooter';
// import { ImageMadCool } from "@/components/MoreAboutMeComponents/image-mad-cool/ImageMadCool";

// export const Home = () => {

//   const t = useTranslations("HomePage");
//   const m = useTranslations("Navbar");

//   return (
//     <div className="flex flex-col sm:flex-row items-center gap-8">
//       <motion.div
//         className="disable-motion-sm"
//         initial={{ opacity: 0, x: -200 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         viewport={{ once: true, amount: "some" }}
//       >
//         <Image className="" src="/jos.png" alt="jos" width={360} height={76} priority />