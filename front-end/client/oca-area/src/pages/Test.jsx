import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { io } from 'socket.io-client'
export default function Test() {
    const [data, setData] = useState("")
    const mama = useRef(null);
    const socket = io('http://localhost:3001')

    const sendMessage = () => {
        socket.emit('sender', mama.current.value)
        mama.current.value = ""
    }

    // this runs on the start of the connection / {server side}
    socket.on('connect', () => {
        console.log(socket.id);
    })

    // best code of 2022
    useEffect(() => {
        socket.on('response', (msg) => {
            // alert(msg);
            setData(msg);
            // alert(msg);
            console.warn(msg);
        })

        return () => {
            socket.off("response");
        };
    }, [socket]);


    return (
        <div className='flex justify-center p-5'>
            <input ref={mama} type="text" className='p-2' placeholder='message' />
            <button className='p-2 bg-blue-700 rounded' onClick={sendMessage}>send</button>
            {data}
        </div>
    )
}
