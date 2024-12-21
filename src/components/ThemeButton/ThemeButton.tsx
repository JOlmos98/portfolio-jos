"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useState, useEffect } from 'react';
import { IoMoon, IoSunny } from "react-icons/io5";
import Image from "next/image";

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

/*

'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() =>  setMounted(true), [])

  if (!mounted) return (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={36}
      height={36}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
  )

  if (resolvedTheme === 'dark') {
    return <FiSun onClick={() => setTheme('light')} />
  }

  if (resolvedTheme === 'light') {
    return <FiMoon onClick={() => setTheme('dark')} />
  }

}

*/