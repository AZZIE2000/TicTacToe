import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import logo from '../images/logo.png'
export default function About() {
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
                    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                        <div class="max-w-3xl">
                            <h2 class="text-3xl text-white font-bold sm:text-4xl">
                                About Us
                            </h2>
                        </div>

                        <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                            <div class="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                                <img
                                    alt="Party"
                                    src={logo}
                                    class="absolute inset-0 h-full  object-cover"
                                />
                            </div>

                            <div class="lg:py-16">
                                <article class="space-y-4 text-white">
                                    <h2 class="text-3xl text-white font-bold sm:text-4xl">
                                        Entertainment Hub
                                    </h2>
                                    <p>
                                        This website was created by Azzam Faraj
                                    </p>

                                    <p>
                                        The idea originally came out from the time the founder was learning in Orange Coding Academy ,
                                        there they used to have a break session where they used to play some group
                                        games to bond and have fun, from there he came to realize that there was
                                        no true service on the internet that provides that part of entertainment
                                        and there started "Entertainment Hub".
                                    </p>
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
