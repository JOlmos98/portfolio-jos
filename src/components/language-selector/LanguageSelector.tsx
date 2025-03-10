"use client";

import { Link, usePathname } from "@/i18n/navigation"; // Hooks de navegación
import { IoLanguage } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const LanguageSelector = () => {
  const pathname = usePathname();

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center cursor-pointer">
        <IoLanguage className="m-1 ml-8 text-2xl hover:text-green-400" />
      </MenuButton>

      <MenuItems className="absolute left-0 mt-2 w-20 bg-gray-800 text-white rounded-md shadow-lg border border-gray-700">
        <MenuItem>
          <Link href={pathname} locale="en" className="block text-center px-4 py-2 rounded-md hover:bg-blue-500">EN</Link>
        </MenuItem>
        <MenuItem>
          <Link href={pathname} locale="es" className="block text-center px-4 py-2 rounded-md hover:bg-blue-500">ES</Link>
        </MenuItem>
        <MenuItem>
          <Link href={pathname} locale="de" className="block text-center px-4 py-2 rounded-md hover:bg-blue-500">DE</Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};





/*

          <button className="block w-full text-left px-4 py-2 hover:bg-blue-500" onClick={() => changeLanguage("de")}>
            DE
          </button>

    <Menu>
      <MenuButton>My account</MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>

*/









// import React from 'react'
// import { IoLanguage } from 'react-icons/io5'

// export const LanguageSelector = () => {
//   return (
//     <div className='flex items-center '>
//       <IoLanguage className="m-1 ml-8 text-2xl hover:text-green-400" />
//     </div>
//   )
// }
