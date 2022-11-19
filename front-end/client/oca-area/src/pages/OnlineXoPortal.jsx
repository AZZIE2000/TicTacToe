import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react'
import { useState } from 'react'
import Header from './Header';
import OnlineXoGame from './OnlineXoGame';

export default function OnlineXoPortal() {
    const [isName, setIsName] = useState(false)
    const [isRoom, setIsRoom] = useState(false)
    const [user, setUser] = useState()
    const [next, setNext] = useState(1)
    const [room, setRoom] = useState("")
    const back = () => {
        console.log("its working");
        setNext(next - 1)
    }

    const name = useRef();
    useEffect(() => {
        if (localStorage.getItem("playerInfo")) {
            setNext(next + 1)
        }

    }, [])
    const handleNext = () => {
        const user = {
            name: name.current.value,
            played: 0,
            won: 0,
        }
        setUser(user)
        localStorage.setItem("playerInfo", JSON.stringify({
            name: name.current.value,
            played: 0,
            won: 0,
        }))
        name.current.value = "";
        setNext(next + 1)
    }
    const handleRoom = () => {
        setRoom(name.current.value)
        setNext(next + 1)
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('playerInfo'))
        if (user) {
            setUser(user)
        }
    }, [])
    return (
        <>
            <Header user={user} />
            <div className='bg-blue-900 flex items-center justify-center h-screen'>
                {next === 1 ?
                    <div className=''>
                        <p className='text-center text-white text-3xl lg:text-7xl md:text-6xl sm:text-5xl  my-5'>Please Enter Your Name</p>
                        <div className="relative z-0">
                            <input ref={name} onChange={(e) => e.target.value.length > 2 ? setIsName(true) : setIsName(false)} type="text" id="floating_standard" className="block text-center py-2.5 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-yellow-100 appearance-none  focus:outline-none focus:ring-0 focus:border-yellow-300 peer font-bold tracking-wider " placeholder="Azzam Faraj" />

                            {/* <label for="floating_standard" class="absolute text-lg text-yellow-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]  peer-focus:left-1/2 peer-focus:text-yellow-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:-translate-x-1/2 left-1/2 peer-focus:scale-75  peer-focus:-translate-y-6 peer-focus:-translate-x-1/2">Floating standard</label> */}
                            {isName && <button onClick={handleNext} className=' p-2 bg-yellow-300 float-right translate-y-4 rounded '>Next</button>}
                        </div>
                    </div>
                    : next === 2 ? <div className=''>
                        <p className='text-center text-white text-3xl lg:text-7xl md:text-6xl sm:text-5xl  my-5'>Please Enter The Room Name</p>
                        <div className="relative z-0">
                            <input ref={name} onChange={(e) => e.target.value.length > 2 ? setIsRoom(true) : setIsRoom(false)} type="text" id="floating_standard" className="block text-center py-2.5 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-yellow-100 appearance-none  focus:outline-none focus:ring-0 focus:border-yellow-300 peer font-bold tracking-wider " placeholder="room" />

                            {/* <label for="floating_standard" class="absolute text-lg text-yellow-100 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]  peer-focus:left-1/2 peer-focus:text-yellow-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:-translate-x-1/2 left-1/2 peer-focus:scale-75  peer-focus:-translate-y-6 peer-focus:-translate-x-1/2">Floating standard</label> */}
                            {isRoom && <button onClick={handleRoom} className=' p-2 bg-yellow-300 float-right translate-y-4 rounded '>Start the match</button>}
                        </div>
                    </div> : <OnlineXoGame back={back} room={room} />}
            </div>
        </>
    )
}
