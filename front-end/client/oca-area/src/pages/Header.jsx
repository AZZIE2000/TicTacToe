import React from 'react'
import { GiPirateGrave } from 'react-icons/gi';
import { AiFillTrophy } from 'react-icons/ai';
import { GiTicTacToe } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
export default function Header({ user }) {

    return (
        <>
            <div className='absolute  t-0 w-full'>
                <div className=' bg-blue-900 container mx-auto  flex justify-between gap-x-12'>
                    <div className=''>
                        <div className='flex gap-x-1'>

                            <Link to={'/xo'} className=' hover:bg-orange-900 hover:text-white p-2 mt-3 font-bold bg-orange-500 rounded-lg' >Back</Link>
                        </div>

                    </div>
                    <div className=''>
                        <div className='flex gap-x-1'>

                            <p className='font-bold mt-3 capitalize text-2xl text-orange-500'>Howdy! {user && user?.name} </p>
                        </div>

                    </div>
                    <div className='flex gap-x-3'>
                        {user &&
                            <>
                                <div className=' flex gap-x-2  text-orange-500'>


                                    <GiTicTacToe className='  place-self-center h-9 w-9' />
                                    <p className='place-self-center text-2xl  font-bold  ' >{user && user?.played}</p>
                                </div>
                                <div className='flex gap-x-2 text-green-600' >
                                    <AiFillTrophy className='  place-self-center h-9 w-9 ' />
                                    <p className='place-self-center  text-2xl font-bold' >{user && user?.won}</p>
                                </div>
                                <div className=' text-red-700 flex gap-x-2'>

                                    <GiPirateGrave className=' place-self-center  h-9 w-9' />
                                    <p className='place-self-center text-2xl font-bold' >{user && user?.played - user?.won}</p>
                                </div>
                            </>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}
