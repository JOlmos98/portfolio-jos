"use client";

import { useState } from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';

export const ThemeButton = () => {

    const [theme, setTheme] = useState<'dark' | 'light'>('light');
    const changeTheme = () => { setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark')); };

    return (
        <div>
            <button onClick={changeTheme} className="flex items-center hover:text-green-300 hover:border-green-300">
                {theme === 'dark' ? (<IoMoon className="m-1 text-2xl hover:text-green-300 " />) : (<IoSunny className="m-1 text-2xl hover:text-green-300" />)}
            </button>
        </div>
    );
};
