import React from 'react'
import { Spinner } from 'flowbite-react'
import { useState } from 'react'

export default function Waiting() {
    const [dots, setDots] = useState(0)
    setTimeout(() => {
        if (dots === 3) {

            setDots(0)
        } else {

            setDots(dots + 1)
        }
    }, 1000);
    return (
        <div className="text-center">
            <Spinner color="success" size="xl" aria-label="Center-aligned spinner example" />

            <p className='text-white mt-6 text-2xl tracking-widest '>Waiting for opponent {dots === 0 ? "" : dots === 1 ? " ." : dots === 2 ? " . ." : " . . ."} </p>




        </div>
    )
}
