import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import logo from '../images/logo.png'
export default function Contact() {
    return (
        <>
            <div className='bg-blue-900 flex flex-col  justify-between h-full'>
                <nav
                    aria-label="Site Nav"
                    class=" flex  items-center justify-around p-4"
                >
                    <img className='h-10 w-10 rounded-md' src={logo} alt="" />

                    <ul class="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <li class="hidden lg:block">
                            <Link class="rounded-lg px-3 py-2" to={'/'}> Home </Link>
                        </li>

                        <li><Link class="rounded-lg px-3 py-2" to={'/all-games'}> Games </Link></li>
                        <li><Link class="rounded-lg px-3 py-2" to={'/about'}> About </Link></li>
                        <li><Link class="rounded-lg px-3 py-2" to={'/contact'}> Contact </Link></li>


                    </ul>
                </nav>


                <section>
                    <div class="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">


                        <div class="mt-8 flex justify-center ">

                            <div class="lg:py-16">
                                <article class="space-y-4 text-white">
                                    <h2 class="text-3xl text-white font-bold sm:text-4xl">
                                        Azzam Faraj
                                    </h2>
                                    <p>
                                        Feel free to Contact me at anytime ❤️
                                    </p>


                                    <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div class="flex flex-col pb-3">
                                            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email address</dt>
                                            <dd class="text-lg font-semibold text-white">azzam.faraj0@gmail.com</dd>
                                        </div>

                                        <div class="flex flex-col pt-3">
                                            <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone number</dt>
                                            <dd class="text-lg font-semibold text-white">+962 7 7808 6316</dd>
                                        </div>
                                    </dl>

                                </article>
                            </div>
                        </div>
                    </div>
                </section>









                <ul className="flex flex-wrap justify-between px-10 items-center gap-6 pb-3 text-sm font-bold">



                    <li className='flex gap-2 text-white  text-xs'>

                        <p className="  ">
                            This webApp was inspired by <a className='hover:text-gray-900/75' target={'_blank'} href="https://yo.orange.jo/orange-coding-academy">Orange Coding Academy</a>

                        </p>
                        <span className=" "> &copy; 2022 Azzam Faraj</span>
                    </li>
                    <li>
                        <div className="flex justify-center   gap-6">
                            <a target='_blank' href='https://www.linkedin.com/in/azzam-faraj-802961197/'>     <FaLinkedin className='h-8 w-8 text-white hover:text-gray-900/75  ' /> </a>
                            <a target='_blank' href='https://github.com/AZZIE2000'>  <BsGithub target='_blank' href='https://github.com/AZZIE2000' className='h-8 w-8 hover:text-gray-900/75 text-white  ' /></a>
                        </div>
                    </li>
                </ul>







            </div >



        </>
    )
}
