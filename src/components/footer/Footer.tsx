"use client";

import React from 'react'
import { IoDownloadOutline, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'
import toast from 'react-hot-toast'
import { FaGoodreads, FaSquareXTwitter } from 'react-icons/fa6';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export const Footer = () => {

    const t = useTranslations('Footer');

    const stringToast: string = t("Email sent successfully");
    const emailSent = () => { toast.success(stringToast); }

    return (

        <footer className="bg-gray-200 dark:bg-zinc-900 py-2">
            <div className="mx-auto w-full max-w-screen-xl">

                <div className="bg-gray-300 dark:bg-zinc-800 p-6 m-6 rounded-2xl max-w-xl w-auto mx-auto">
                    <h2 className='text-xl font-bold mb-4'>{t('Subscribe to my ')}<span className="text-blue-cyan dark:text-blue-cyan font-bold">{t('newsletter')}</span></h2>
                    <div className="flex items-center justify-center">
                        <p>
                            {t('Leave me your email if')}
                        </p>
                    </div>
                    <div className="flex items-center justify-center pt-5">
                        <input type="text" className='text-blue-cyan dark:text-blue-cyan min-w-24 px-4 py-2 rounded-2xl' placeholder={t('Your email')} />
                        <button onClick={emailSent} className='ml-4 bg-cyan-600 hover:bg-blue-cyan text-white font-bold py-2 px-4 rounded-2xl'>
                            {t('Subscribe')}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">

                    <div>
                        <h2 className='text-xl font-bold mb-5'>
                            {t('ABOUT THIS WEBSITE')}
                        </h2>
                        <p className="mb-4 text-gray-500 dark:text-gray-400">{t('This web has been developed by Jesús Olmos for')}</p>
                        <a href="/cv.pdf" download="cv_jesus_olmos.pdf" className='flex items-center mb-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'>
                            <span>{t('Download CV')}</span>
                            <IoDownloadOutline className='text-xl ml-3' />
                        </a>
                    </div>
                    <div>
                        <h2 className='text-xl font-bold mb-5'>
                            {t('FOLLOW ME')}
                        </h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className='mb-3'>
                                <Link href="https://github.com/JOlmos98" className="flex items-center hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transform origin-left">
                                    <IoLogoGithub className='mr-2 text-xl' />
                                    <span>Github</span>
                                </Link>
                            </li>
                            <li className='mb-3'>
                                <Link href="https://www.linkedin.com/in/jes%C3%BAs-olmos-soler-62549018b/" className="flex items-center hover:text-blue-500 hover:scale-105 transform origin-left">
                                    <IoLogoLinkedin className='mr-2 text-xl' />
                                    <span>LinkedIn</span>
                                </Link>
                            </li>
                            <li className='mb-3'>
                                <Link href="https://x.com/yeezusc_" className="flex items-center hover:text-cyan-400 hover:scale-105 transform origin-left">
                                    <FaSquareXTwitter className='mr-2 text-xl' />
                                    <span>Twitter</span>
                                </Link>
                            </li>
                            <li className='mb-3'>
                                <Link href="https://www.goodreads.com/user/show/84061216-jes-s-olmos-soler" className="flex items-center hover:text-yellow-400 hover:scale-105 transform origin-left">
                                    <FaGoodreads className='mr-2 text-xl' />
                                    <span>Goodreads</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-xl font-bold mb-5'>
                            {t('TABLE OF CONTENTS')}
                        </h2>
                        <ul className='text-gray-500 dark:text-gray-400 font-medium'>
                            <li className='mb-2'>
                                <Link href='/' className="flex items-center hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transform origin-left">
                                    • {t('home')}
                                </Link>
                            </li>
                            <li className='mb-2'>
                                <Link href='/moreAboutMe' className="flex items-center hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transform origin-left">
                                    • {t('moreAboutMe')}
                                </Link>
                            </li>
                            <li className='mb-2'>
                                <Link href='/projects' className="flex items-center hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transform origin-left">
                                    • {t('projects')}
                                </Link>
                            </li>
                            <li className='mb-2'>
                                <Link href='/articles' className="flex items-center hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transform origin-left">
                                    • {t('articles')}
                                </Link>
                            </li>
                            <li className='mb-2'>
                                <Link href='/contact' className="flex items-center hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transform origin-left">
                                    • {t('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-xl font-bold mb-5'>
                            {t('DEVELOPED WITH')}
                        </h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-3">
                                <Link href="https://nextjs.org/" className=" hover:underline">Next.js</Link>
                            </li>
                            <li className="mb-3">
                                <Link href="https://es.react.dev/" className="hover:underline">React</Link>
                            </li>
                            <li className="mb-3">
                                <Link href="https://www.typescriptlang.org/" className="hover:underline">TypeScript</Link>
                            </li>
                            <li className="mb-3">
                                <Link href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className='flex items-center justify-center pb-5 text-gray-500 dark:text-gray-400 text-sm'>© 2025 Jesús Olmos.&nbsp;<Link href="https://github.com/JOlmos98/portfolio-jos" className="hover:underline">{t('This site is open source')}</Link></p>
            </div>
        </footer>
    )
}

