"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { IoLanguage } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect } from "react";

export const LanguageSelector = () => {
  
  const pathname = usePathname();

  useEffect(() => {                                                            // Esta función restaura el overflow cuando el menú está abierto

    // Establecemos los overflow en auto para ver la barra de scroll después de esperar 5 milisegundos
    const handleMenuOpen = () => {                                             // Función para manejar cambios en el menú
      setTimeout(() => {                                                       // Pequeño retraso para asegurar que se ejecuta después de que Headless UI modifica el estilo                                                      
        document.body.style.overflow = "auto";                                 // Restaurar el overflow para mantener la barra de scroll visible
        document.documentElement.style.overflow = "auto";
      }, 5);
    };

    // Observamos los cambios del DOM, en este caso vemos si ele lemento con role="menu" está abierto
    const observer = new MutationObserver((mutations) => {                     // Observar cambios en el DOM para detectar cuando el menú se abre
      mutations.forEach(() => {                                                // Recorremos el array de mutaciones (MutationRecord[])
        const menuOpen = document.querySelector('[role="menu"]');              // Verificar si hay un elemento de menú abierto, en ese caso usamos handleMenuOpen();
        if (menuOpen) {
          handleMenuOpen();
        }
      });
    });

    // Iniciamos la observación
    observer.observe(document.body, {                                          // Iniciar la observación del body para detectar cambios
      attributes: true,
      childList: true,
      subtree: true
    });

    // Desconectamos el observer al desmontar el componente
    return () => {
      observer.disconnect();
    };
  }, []);


  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center cursor-pointer">
        <IoLanguage className="text-2xl hover:text-green-400" />
      </MenuButton>

      <MenuItems className="absolute left-1/2 -translate-x-1/2 mt-2 w-20 dark:bg-gray-800 bg-gray-200 dark:text-white rounded-md shadow-lg border dark:border-gray-700 z-50">
        <MenuItem>
          <Link href={pathname} locale="en" className="block text-center px-4 py-2 rounded-md dark:hover:bg-green-600 hover:bg-green-400">EN</Link>
        </MenuItem>
        <MenuItem>
          <Link href={pathname} locale="es" className="block text-center px-4 py-2 rounded-md dark:hover:bg-green-600 hover:bg-green-400">ES</Link>
        </MenuItem>
        <MenuItem>
          <Link href={pathname} locale="de" className="block text-center px-4 py-2 rounded-md dark:hover:bg-green-600 hover:bg-green-400">DE</Link>
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
