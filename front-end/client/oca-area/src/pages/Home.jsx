import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import logo from '../images/logo.png'
export default function Home() {
    return (
        <div className='bg-blue-900 flex flex-col  justify-between h-screen'>
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


            <div
                class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
            >
                <div class="mx-auto max-w-xl text-center">
                    <h1 class="text-3xl font-extrabold sm:text-5xl">
                        It's Time For
                        <strong class="font-extrabold text-red-700 sm:block">
                            An IceBreaking Session
                        </strong>
                    </h1>

                    <p class="mt-4 text-white sm:text-xl sm:leading-relaxed">
                        Play some of the exciting games online or with friends and have fun !
                    </p>

                    <div class="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            class="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                            to={'/all-games'}
                        >
                            Browse Games
                        </Link>
                    </div>
                </div>
            </div>









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
    )
}
