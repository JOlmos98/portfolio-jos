"use client";

import { useEffect, useState } from "react";
import { IoChevronUpOutline } from "react-icons/io5";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-white/50 dark:bg-white/10 text-black dark:text-white p-3 rounded-full shadow-lg transition-colors"
      >
        <IoChevronUpOutline className="text-2xl" />
      </button>
    )
  );
};