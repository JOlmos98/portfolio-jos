"use client";

import React from 'react';
import { IoLinkOutline } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

export const CopyUrlButton = ({ url }: { url: string }) => {

  const t = useTranslations("Articles");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t("urlCopied"));
    } catch (err) {
      console.error("Failed to copy URL:", err);
      toast.error(t("urlNotCopied"));
    }
  };

  return (
    <button
      onClick={handleCopy}
      title={t("copyUrl")}
      className="active:scale-75 transition-transform duration-150"
    >
      <IoLinkOutline className="text-xl mx-2 cursor-pointer hover:text-blue-cyan transition-colors" />
    </button>

  );
};
