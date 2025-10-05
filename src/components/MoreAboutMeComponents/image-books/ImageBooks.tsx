"use client";

import React from "react";
import ImageWithFooter from "../image-with-footer/ImageWithFooter";
import { useTranslations } from "next-intl";

export const ImageBooks = () => {

    const m = useTranslations("MoreAboutMe");

    return (
        <div>
            <div className="text-center block mx-auto">
                <ImageWithFooter className="block mx-auto rounded-2xl transition" src="https://i.imgur.com/igsucKn.png" alt="jos" width={900} height={360} priority text={m("img2")} />
            </div>
        </div>
    )
};