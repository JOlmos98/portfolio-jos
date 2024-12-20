import React from 'react'
import Link from 'next/link'
import { IoCodeSlash } from 'react-icons/io5'
import { LanguageSelector } from '../LanguageSelector/LanguageSelector'
import { ThemeButton } from '../ThemeButton/ThemeButton'

export const Navbar = () => {
    return (
        <nav className="fixed w-full bg-indigo-400 bg-opacity-30 p-3 flex items-center">
            <Link href={'/home'} className="flex items-center relative transform hover:scale-105 text-xl hover:text-blue-300 transition duration-100">
                <IoCodeSlash className="mr-2 ml-1 text-3xl" />
                <span className="text-2xl">Jesús Olmos</span>
            </Link>

            <div className="flex-1"></div>

            <div className="flex space-x-7">
                <Link href="/moreAboutMe" className="relative transform hover:scale-105 text-xl hover:text-blue-300 transition duration-100">More about me</Link>
                <Link href="/projects" className="relative transform hover:scale-105 text-xl hover:text-blue-300 transition duration-100">Projects</Link>
                <Link href="/articles" className="relative transform hover:scale-105 text-xl hover:text-blue-300 transition duration-100">Articles</Link>
                <Link href="/contact" className="relative transform hover:scale-105 text-xl hover:text-blue-300 transition duration-100">Contact</Link>
                <LanguageSelector />
                <ThemeButton />
            </div>
        </nav>
    )
}
