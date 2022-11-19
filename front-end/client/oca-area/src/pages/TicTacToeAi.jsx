import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { GiPirateGrave } from 'react-icons/gi';
import { AiFillTrophy } from 'react-icons/ai';
import { GiTicTacToe } from 'react-icons/gi';
import O from './O';
import X from './X';
import swal from 'sweetalert';

export default function TicTacToeAi() {
    // who's turn is it? / the X always starts
    const [turn, setTurn] = useState("X");
    // to know who's the winner
    const [winner, setWinner] = useState(null);
    // all empty cells [ default Values ]
    const cells = {
        0: "-",
        1: "-",
        2: "-",
        3: "-",
        4: "-",
        5: "-",
        6: "-",
        7: "-",
        8: "-",
    }
    // the state of the cells
    const [cell, setCell] = useState(cells)
    // the score board
    const [score, setScore] = useState({
        games: 1,
        wins: 0,
        lose: 0,
    })

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

    // a function to set the score after the match ends
    const showScore = () => {
        if (winner === 'X') {
            setScore({ ...score, wins: score.wins + 1, games: score.games + 1 })
        } else if (winner === 'O') {
            setScore({ ...score, lose: score.lose + 1, games: score.games + 1 })
        }
    }

    // handling the Clicks to add moves
    const handleClick = (num) => {
        // if we have a winner do nothing
        if (winner) {
            return
        } else {
            // if the cell isn't empty ... don't make a move
            if (cell[num] != "-") {
                return;
            }
            // if its [X] playing 
            else if (turn === "X") {
                // switch turns
                setTurn("O")
            }
            // if its [O] playing 
            else {
                // switch turns
                setTurn("X")
            }
            // and last but not least , set the cell
            setCell({ ...cell, [num]: turn })
            // after the move check if there is any winners...
            checkWinner()
        }
    }
    // listening if the player made a move so the API can make its move
    useEffect(() => {
        // if we have a winner do nothing
        if (winner) {
            return
        }
        else {
            // checking if its the API turn
            if (turn === "O") {
                // a request to the server with the moves
                axios.get(`https://tttapi.herokuapp.com/api/v1/${cell[0]}${cell[1]}${cell[2]}${cell[3]}${cell[4]}${cell[5]}${cell[6]}${cell[7]}${cell[8]}/${turn}`,
                    { withCredentials: false }
                )
                    .then(res => {
                        // set the cell
                        setCell({ ...cell, [res.data.recommendation]: turn })
                        // switch turns
                        setTurn("X")
                    })
            }
        }
        // check for winners
        checkWinner()
    }, [cell])

    // if the match ended check for a win or a tie
    useEffect(() => {
        // if [X] won
        if (winner === 'X') {
            showScore()
            // and the player was [X]
            // show that he won
            swal({
                title: "Good job!",
                text: "You Won!",
                icon: "success",
                button: "Play again!",
            }).then(
                (value) => {
                    // if the player clicked on "Play again" it resets the game
                    if (value === true) {
                        // reset cells
                        setCell(cells)
                        // reset the winner
                        setWinner(null)
                        // reset the game turn
                        setTurn("X")

                    }
                }
            )
        }
        // or If the player was [O]
        if (winner === 'O') {
            showScore()
            // and the player was [O]
            swal({
                title: "Awww bad luck!",
                text: "You Lost!",
                icon: "error",
                button: "Play again!",
            }).then(
                (value) => {
                    // if the player clicked on "Play again" it resets the game
                    if (value === true) {
                        // reset cells
                        setCell(cells)
                        // reset the winner
                        setWinner(null)
                        // reset the game turn
                        setTurn("X")
                    }
                }
            )
            // or If the player was [X]
        }
        // if the result was a tie
        if (winner === 'tie') {
            showScore()
            swal({
                title: "GG!",
                text: "Its a Tie!",
                icon: "info",
                button: "Play again!",
            }).then(
                (value) => {
                    // if the player clicked on "Play again" it resets the game
                    if (value === true) {
                        // reset cells
                        setCell(cells)
                        // reset the winner
                        setWinner(null)
                        // reset the game turn
                        setTurn("X")
                        setScore({ ...score, games: score.games + 1 })
                    }
                }
            )
        }
    }, [winner])

    return (
        <>
            <div className='absolute  t-0 w-full'>
                <div className=' bg-blue-900 container mx-auto  flex justify-between gap-x-12'>
                    <div className=''>
                        <div className='flex gap-x-1'>
                            <Link to={'/xo'} className=' hover:bg-orange-900 hover:text-white md:p-2 p-1 mt-3 ml-2 font-bold bg-orange-500 rounded-lg' >Back</Link>
                        </div>
                    </div>
                    <p className='font-bold mt-3  capitalize text-md md:text-2xl text-orange-500'>Howdy!</p>
                    <div className='flex gap-x-3 mr-3'>
                        <>
                            <div className=' flex gap-x-2  text-orange-500'>
                                <GiTicTacToe className='  place-self-center h-5 w-5 md:h-9 md:w-9' />
                                <p className='place-self-center text-1xl md:text-2xl font-bold  ' >{score?.games}</p>
                            </div>
                            <div className='flex gap-x-2 text-green-600' >
                                <AiFillTrophy className='  place-self-center h-5 w-5 md:h-9 md:w-9 ' />
                                <p className='place-self-center  text-1xl md:text-2xl font-bold' >{score?.wins}</p>
                            </div>
                            <div className=' text-red-700 flex gap-x-2'>

                                <GiPirateGrave className=' place-self-center h-5 w-5 md:h-9 md:w-9' />
                                <p className='place-self-center text-1xl md:text-2xl font-bold' >{score?.lose}</p>
                            </div>
                        </>
                    </div>
                </div>
            </div>
            <div className='bg-blue-900 grid grid-cols-1 items-center justify-center h-screen'>
                <div className='container   relative mx-auto'>
                    <div className='grid  mx-auto self-center grid-cols-3 gap-3 place-items-center h-64 w-64 lg:h-96 lg:w-96 md:h-80 md:w-80 sm:h-72 sm:w-72    ' >
                        <div onClick={() => handleClick(0)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[0] === "-" && <X styling={'hidden group-hover:bg-gray-500 group-hover:block'} />}
                            {cell[0] === "X" ? <X /> : cell[0] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(1)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[1] === "-" && <X styling={'hidden group-hover:block group-hover:bg-gray-500'} />}
                            {cell[1] === "X" ? <X /> : cell[1] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(2)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[2] === "-" && <X styling={'hidden group-hover:block group-hover:bg-gray-500'} />}
                            {cell[2] === "X" ? <X /> : cell[2] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(3)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[3] === "-" && <X styling={'hidden group-hover:block group-hover:bg-gray-500'} />}
                            {cell[3] === "X" ? <X /> : cell[3] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(4)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[4] === "-" && <X styling={'hidden group-hover:block group-hover:bg-gray-500'} />}
                            {cell[4] === "X" ? <X /> : cell[4] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(5)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[5] === "-" && <X styling={'hidden group-hover:block group-hover:bg-gray-500'} />}
                            {cell[5] === "X" ? <X /> : cell[5] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(6)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[6] === "-" && <X styling={'hidden group-hover:block group-hover:bg-gray-500'} />}
                            {cell[6] === "X" ? <X /> : cell[6] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(7)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[7] === "-" && <X styling={'hidden group-hover:block group-hover:bg-gray-500'} />}
                            {cell[7] === "X" ? <X /> : cell[7] === "O" ? <O /> : ""}
                        </div>
                        <div onClick={() => handleClick(8)} className='bg-blue-400 h-full w-full flex justify-center items-center group rounded-lg shadow-2xl shadow-gray-900' >
                            {cell[8] === "-" && <X styling={'hidden group-hover:block group-hover:bg-gray-500'} />}
                            {cell[8] === "X" ? <X /> : cell[8] === "O" ? <O /> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
