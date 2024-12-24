import React from 'react'
import Link from 'next/link'
import { IoCodeSlash } from 'react-icons/io5'
import { LanguageSelector } from '../language-selector/LanguageSelector'
import { ThemeButton } from '../theme-button/ThemeButton'

export const Navbar = () => {
    return (
        <nav className="fixed w-full bg-white/10 backdrop-blur-md shadow-md p-5 flex flex-wrap items-center justify-between">
            <Link href='/home' className="flex items-center relative transform hover:scale-105 text-xl hover:text-blue-400 transition duration-100">
                <IoCodeSlash className="mr-2 ml-1 text-4xl" />
                <span className="text-2xl">Jesús Olmos</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center w-full lg:w-auto space-y-4 lg:space-y-0 lg:space-x-7 mt-4 lg:mt-0">
                <Link href="/moreAboutMe" className="relative transform hover:scale-105 text-xl hover:text-blue-400 transition duration-100 text-center">More about me</Link>
                <Link href="/projects" className="relative transform hover:scale-105 text-xl hover:text-blue-400 transition duration-100 text-center">Projects</Link>
                <Link href="/articles" className="relative transform hover:scale-105 text-xl hover:text-blue-400 transition duration-100 text-center">Articles</Link>
                <Link href="/contact" className="relative transform hover:scale-105 text-xl hover:text-blue-400 transition duration-100 text-center">Contact</Link>

                <div className="flex space-x-4 items-center justify-center">
                    <Link href="/login" className="border-2 border-black dark:border-white rounded-2xl px-3 py-1 text-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-200 text-center">Login</Link>
                    <Link href="/signUp" className="border-2 border-black dark:border-white rounded-2xl px-3 py-1 text-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-200 text-center">Sign up</Link>
                </div>

                <div className="flex space-x-4 items-center justify-center">
                    <LanguageSelector />
                    <ThemeButton />
                </div>
            </div>
        </nav>
    )
}
