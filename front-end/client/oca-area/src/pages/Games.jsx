import React from 'react'
import { Link } from 'react-router-dom'
import { GiTicTacToe } from 'react-icons/gi';
import { FaLinkedin } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import logo from '../images/logo.png'
export default function Games() {
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
                class=" gap-10 container mx-auto items-center grid  md:grid-cols-3 lg:grid-cols-3    "
            >


                <Link to={'/xo'} class="group  ">
                    <img
                        alt="Lava"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/1200px-Tic_tac_toe.svg.png"
                        class="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                    />
                    <div class="p-4">
                        <a href="#">
                            <h3 class="text-lg text-center font-medium text-white">
                                Tic Tac Toe
                            </h3>
                        </a>
                    </div>
                </Link>

                <div class="group  ">
                    <img
                        alt="Lava"
                        src="https://play-lh.googleusercontent.com/XOvH8XNuTflDrIjn4FqMifuGBE7WeADxd3cGpuBHIjBax9lchywY5v_kDqi-nmxjHFA"
                        class="h-56 relative w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                    />
                    <div class="p-4">
                        <p href="#">
                            <h3 class="text-lg text-center font-medium text-white">
                                Guess The Word

                                <span className='text-orange-600'> Coming Soon</span>
                            </h3>
                        </p>
                    </div>
                </div>
                <div class="group  ">
                    <img
                        alt="Lava"
                        src="https://unity3d.college/wp-content/uploads/2017/07/MP-Drawing-Featured.jpg"
                        class="h-56 relative w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                    />
                    <div class="p-4">
                        <p href="#">
                            <h3 class="text-lg text-center font-medium text-white">
                                Draw The Word

                                <span className='text-orange-600'> Coming Soon</span>
                            </h3>
                        </p>
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
