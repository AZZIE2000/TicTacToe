import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import O from './O'
import X from './X'
import Waiting from './Waiting'
import swal from 'sweetalert'

export default function OnlineXoGame(props) {
    // get back to the lobby function
    const back = props.back
    // socket to the server
    const socket = io('http://localhost:3001')
    // the room
    const [room, setRoom] = useState("")
    // if there is an opponent
    const [waiting, setWaiting] = useState(true)
    // the player (X or O)
    const [me, setMe] = useState("")
    // to know who's player turn
    const [turns, setTurns] = useState("")
    // to know who won (the winner)
    const [winner, setWinner] = useState(null)
    // all the cells instant
    const [cell, setCell] = useState({
        0: "-",
        1: "-",
        2: "-",
        3: "-",
        4: "-",
        5: "-",
        6: "-",
        7: "-",
        8: "-",
    })

    // get the room and set it onload
    useEffect(() => setRoom(props.room), [])

    // function to check if there's a winner
    const checkWinner = () => {
        // all the win patterns
        const wins = {
            horizontal: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            vertical: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            across: [
                [0, 4, 8],
                [2, 4, 6],
            ]
        }
        // loop to check if anyone won
        for (let win in wins) {
            wins[win].forEach(pattern => {
                // if all cells empty
                if (
                    cell[pattern[0]] === "-" || cell[pattern[1]] === "-" || cell[pattern[2]] === "-"
                ) {
                    // do nothing
                }
                // if we have a matching pattern => WIN
                else if (
                    cell[pattern[0]] === cell[pattern[1]] &&
                    cell[pattern[1]] === cell[pattern[2]]
                ) {
                    setWinner(cell[pattern[0]])
                }
                // if all cells are NOT empty so its a tie
                else if (
                    cell[0] != "-" &&
                    cell[1] != "-" &&
                    cell[2] != "-" &&
                    cell[3] != "-" &&
                    cell[4] != "-" &&
                    cell[5] != "-" &&
                    cell[6] != "-" &&
                    cell[7] != "-" &&
                    cell[8] != "-"
                ) {
                    setWinner("tie")
                }
            });
        }
    }

    // handling the Clicks to add moves
    const handleClick = (num) => {
        // if we have a winner do nothing
        if (winner) {
            return
        }
        // check if its the player turn
        else if (me === turns) {
            // if the cell trying to make a move in is already full do nothing
            if (cell[num] === "X" || cell[num] === "O") {
                return;
            }
            // if its the first move in the game and all the cells are empty
            if (
                cell[0] === "-" &&
                cell[1] === "-" &&
                cell[2] === "-" &&
                cell[3] === "-" &&
                cell[4] === "-" &&
                cell[5] === "-" &&
                cell[6] === "-" &&
                cell[7] === "-" &&
                cell[8] === "-"
            ) {
                // send a req to the server with the (cellNum , roomID , player) 
                socket.emit('num', num, room, "X")
                // set the player to [X]
                setMe("X")
                // set the chosen cell to the player Sign [X]
                setCell({ ...cell, [num]: "X" })
                // change the playing turn to the other player
                setTurns("O")
                // and finally end the process
                return
            }
            // if the cells are not all empty and the player is [X]
            if (me === "X") {
                // send a req to the server with the (cellNum , roomID , player) 
                socket.emit('num', num, room, "X")
                // set the chosen cell to the player Sign [X]
                setCell({ ...cell, [num]: "X" })
                // change the playing turn to the other player
                setTurns("O")
            }
            // if the cells are not all empty and the player is [O]
            else if (me === "O") {
                // send a req to the server with the (cellNum , roomID , player)
                socket.emit('num', num, room, "O")
                // set the chosen cell to the player Sign [O]
                setCell({ ...cell, [num]: "O" })
                // change the playing turn to the other player
                setTurns("X")
            }
            // and after all of that check if there is any winner 
            checkWinner()
        } else {
            // if its not the player turn alert that its not their turn
            swal({
                title: "Its Not Your Turn!",
                text: "Wait for the opponent to play!",
                icon: "warning",
                button: "Okay!",
            })
        }
    }

    // whenever a new cell been added double check if there is a winner
    useEffect(() => {
        if (winner) {
            return
        }
        checkWinner()
    }, [cell])

    // if the match ended check for a win or a tie
    useEffect(() => {
        // if [X] won
        if (winner === 'X') {
            // and the player was [X]
            if (me === "X") {
                // show that he won
                swal({
                    title: "Good job!",
                    text: "You Won!",
                    icon: "success",
                    button: "Back to lobby!",
                }).then(
                    (value) => {
                        // if the player clicked on "go back to lobby" => goes back to the room page
                        if (value === true) {
                            back();
                        }
                    }
                )
            }
            // or If the player was [O]
            else {
                // show that he lost
                swal({
                    title: "Awww bad luck!",
                    text: "You Lost!",
                    icon: "error",
                    button: "Back to lobby!",
                }).then(
                    (value) => {
                        // if the player clicked on "go back to lobby" => goes back to the room page
                        if (value === true) {
                            back();
                        }
                    }
                );

            }
        }
        // if [O] won
        if (winner === 'O') {
            // and the player was [O]
            if (me === "O") {
                // show that he won
                swal({
                    title: "Good job!",
                    text: "You Won!",
                    icon: "success",
                    button: "Back to lobby!",
                }).then(
                    (value) => {
                        // if the player clicked on "go back to lobby" => goes back to the room page
                        if (value === true) {
                            back();
                        }
                    }
                )
            }
            // or If the player was [X]
            else {
                // show that he lost
                swal({
                    title: "Awww bad luck!",
                    text: "You Lost!",
                    icon: "error",
                    button: "Back to lobby!",
                }).then(
                    (value) => {
                        // if the player clicked on "go back to lobby" => goes back to the room page
                        if (value === true) {
                            back();
                        }
                    }
                )
            }
        }
        // if the result was a tie
        if (winner === 'tie') {
            swal({
                title: "GG!",
                text: "Its a Tie!",
                icon: "info",
                button: "Back to lobby!",
            }).then(
                (value) => {
                    // if the player clicked on "go back to lobby" => goes back to the room page
                    if (value === true) {
                        back();
                    }
                }
            )
        }
    }, [winner])

    // onload & connecting to the server
    socket.on('connect', () => {
        // send the chosen room id to the server
        socket.emit('room', room)
    })

    // note : this way of listening to a server request prevents duplicating messages
    // listen to the server
    useEffect(() => {
        // if there is a request form the server called {start}
        socket.on('start', value => {

            if (value) {
                // do nothing // the match did not start yet 
            }
            // the match started
            else if (!value) {
                setWaiting(false)
            }
        })
        // end connection
        return () => {
            socket.off("start");
        };
    }, [socket]);

    // listen to the server if the opponent made a new move
    useEffect(() => {
        // if there is a request form the server called {res-num}
        socket.on('res-num', (num, player) => {
            // set the cell
            setCell({ ...cell, [num]: player })
            if (player === "X") {
                setMe("O")
                setTurns("O")
            } else {
                setMe("X")
                setTurns("X")
            }
        })
        return () => {
            socket.off("res-num");
        };
    }, [socket]);

    return (
        <>
            {/* if there are no opponent show the waiting room */}
            {waiting ? <Waiting /> :
                <div className='container relative mx-auto'>
                    <div className='grid mx-auto self-center grid-cols-3 gap-3 place-items-center h-96 w-96 lg:h-96 lg:w-96 md:h-72 md:w-72 sm:h-48 sm:w-48 xs:h-48 xs:w-48 ' >
                        <div onClick={() => handleClick(0)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[0] === "-" && me === "X" ? <X styling={'hidden group-hover:bg-gray-500 group-hover:block'} /> : cell[0] === "-" && me === "O" ? <O styling={'hidden group-hover:bg-gray-500 group-hover:block'} styling2={'hidden group-hover:block'} /> : me === "" && < X styling={'hidden group-hover:bg-gray-500 group-hover:block'} />}
                            {cell[0] === "X" ? <X /> : cell[0] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(1)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[1] === "-" && me === "X" ? <X styling={'hidden group-hover:block group-hover:bg-gray-500'} /> : cell[1] === "-" && me === "O" ? <O styling={'hidden group-hover:block group-hover:bg-gray-500'} styling2={'hidden group-hover:block'} /> : me === "" && <X styling={'hidden group-hover:bg-gray-500 group-hover:block'} />}
                            {cell[1] === "X" ? <X /> : cell[1] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(2)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[2] === "-" && me === "X" ? <X styling={'hidden group-hover:block group-hover:bg-gray-500'} /> : cell[2] === "-" && me === "O" ? <O styling={'hidden group-hover:block group-hover:bg-gray-500'} styling2={'hidden group-hover:block'} /> : me === "" && <X styling={'hidden group-hover:bg-gray-500 group-hover:block'} />}
                            {cell[2] === "X" ? <X /> : cell[2] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(3)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[3] === "-" && me === "X" ? <X styling={'hidden group-hover:block group-hover:bg-gray-500'} /> : cell[3] === "-" && me === "O" ? <O styling={'hidden group-hover:block group-hover:bg-gray-500'} styling2={'hidden group-hover:block'} /> : me === "" && <X styling={'hidden group-hover:bg-gray-500 group-hover:block'} />}
                            {cell[3] === "X" ? <X /> : cell[3] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(4)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[4] === "-" && me === "X" ? <X styling={'hidden group-hover:block group-hover:bg-gray-500'} /> : cell[4] === "-" && me === "O" ? <O styling={'hidden group-hover:block group-hover:bg-gray-500'} styling2={'hidden group-hover:block'} /> : me === "" && <X styling={'hidden group-hover:bg-gray-500 group-hover:block'} />}
                            {cell[4] === "X" ? <X /> : cell[4] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(5)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[5] === "-" && me === "X" ? <X styling={'hidden group-hover:block group-hover:bg-gray-500'} /> : cell[5] === "-" && me === "O" ? <O styling={'hidden group-hover:block group-hover:bg-gray-500'} styling2={'hidden group-hover:block'} /> : me === "" && <X styling={'hidden group-hover:bg-gray-500 group-hover:block'} />}
                            {cell[5] === "X" ? <X /> : cell[5] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(6)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[6] === "-" && me === "X" ? <X styling={'hidden group-hover:block group-hover:bg-gray-500'} /> : cell[6] === "-" && me === "O" ? <O styling={'hidden group-hover:block group-hover:bg-gray-500'} styling2={'hidden group-hover:block'} /> : me === "" && <X styling={'hidden group-hover:bg-gray-500 group-hover:block'} />}
                            {cell[6] === "X" ? <X /> : cell[6] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(7)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[7] === "-" && me === "X" ? <X styling={'hidden group-hover:block group-hover:bg-gray-500'} /> : cell[7] === "-" && me === "O" ? <O styling={'hidden group-hover:block group-hover:bg-gray-500'} styling2={'hidden group-hover:block'} /> : me === "" && <X styling={'hidden group-hover:bg-gray-500 group-hover:block'} />}
                            {cell[7] === "X" ? <X /> : cell[7] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(8)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[8] === "-" && me === "X" ? <X styling={'hidden group-hover:block group-hover:bg-gray-500'} /> : cell[8] === "-" && me === "O" ? <O styling={'hidden group-hover:block group-hover:bg-gray-500'} styling2={'hidden group-hover:block'} /> : me === "" && <X styling={'hidden group-hover:bg-gray-500 group-hover:block'} />}
                            {cell[8] === "X" ? <X /> : cell[8] === "O" ? <O /> : ""}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}