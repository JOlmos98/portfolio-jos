// ImageWithFooter.tsx
"use client";

import React from "react";
import Image, { ImageProps } from "next/image";

export interface ImageWithFooterProps extends ImageProps {
  text?: React.ReactNode;
  wrapperClassName?: string;
  captionClassName?: string;
}

export default function ImageWithFooter({
  text,
  wrapperClassName = "inline-block",
captionClassName = "text-center mt-2 italic text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-200",
  className,
  ...imageProps
}: ImageWithFooterProps) {
  // añadimos filtros + transición + la clase para activar en hover del grupo
  const imgClass = [
    "rounded-xl",
    "filter grayscale",
    "group-hover:grayscale-0",
    "transition-all duration-300 ease-out",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // wrapper tiene la clase "group" para poder usar group-hover en la img
    <figure className={`${wrapperClassName} group`}>
      <Image {...imageProps} className={imgClass} alt="jos" />
      {text ? <figcaption className={captionClassName}>{text}</figcaption> : null}
    </figure>
  );
}
