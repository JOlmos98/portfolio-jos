import React from 'react'
import Link from 'next/link'
import { IoCodeSlash } from 'react-icons/io5'
import { LanguageSelector } from '../language-selector/LanguageSelector'
import { ThemeButton } from '../theme-button/ThemeButton'

export const Navbar = () => {
    return (
        <nav className="fixed w-full bg-white/10 backdrop-blur-md shadow-md p-4 flex items-center">
            <Link href={'/home'} className="flex items-center relative transform hover:scale-105 text-xl hover:text-blue-400 transition duration-100">
                <IoCodeSlash className="mr-2 ml-1 text-4xl" />
                <span className="text-2xl">Jesús Olmos</span>
            </Link>

            <div className="flex-1"></div>

            <div className="flex space-x-7">
                <Link href="/moreAboutMe" className="relative transform hover:scale-105 text-xl hover:text-blue-400 transition duration-100">More about me</Link>
                <Link href="/projects" className="relative transform hover:scale-105 text-xl hover:text-blue-400 transition duration-100">Projects</Link>
                <Link href="/articles" className="relative transform hover:scale-105 text-xl hover:text-blue-400 transition duration-100">Articles</Link>
                <Link href="/contact" className="relative transform hover:scale-105 text-xl hover:text-blue-400 transition duration-100">Contact</Link>
                <LanguageSelector />
                <ThemeButton />
            </div>
        </nav>
    )
}
