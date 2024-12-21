"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';
import { IoMoon, IoSunny } from "react-icons/io5";

export const ThemeButton = () => {

  const { setTheme, resolvedTheme } = useTheme();
  const toggleTheme = () => {setTheme(resolvedTheme === "light" ? "dark" : "light");};
  
  const [mounted, setMounted] = useState(false)
  useEffect(() =>  setMounted(true), [])
  
  if (!mounted) return (
    <p>Loading...</p>
  )

  return (
    <div>
      <button onClick={toggleTheme} className="flex items-center hover:text-green-400 hover:border-green-400">
        {resolvedTheme === "dark" ? (<IoMoon className="m-1 text-2xl hover:text-green-400" />) : (<IoSunny className="m-1 text-2xl hover:text-green-400" />)}
      </button>
    </div>
  );
};
