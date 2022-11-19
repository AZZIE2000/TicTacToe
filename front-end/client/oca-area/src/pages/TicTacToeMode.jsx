import { Link } from "react-router-dom";
import { GiPirateGrave } from 'react-icons/gi';
import { AiFillTrophy } from 'react-icons/ai';
import { GiTicTacToe } from 'react-icons/gi';

export default function TicTacToeMode() {
    return (
        <>
            <div className="h-screen relative flex gap-10 md:gap-0 flex-col">


                <div className='  bg-blue-900 flex flex-col justify-between  '>
                    <div className='  container  mx-auto  flex justify-around gap-x-12'>



                        <Link to={'/'} className=' hover:bg-orange-900 hover:text-white h-fit p-2  m-3 font-bold bg-orange-500 rounded-lg' >Back</Link>




                        <div className='flex gap-x-1'>

                            <p className='font-bold mt-3 capitalize text-2xl text-orange-500'>Howdy! Choose Game Mode ...  </p>
                        </div>



                    </div>

                </div>

                <div className="flex bg-blue-900 h-full p-20 md:p-0 items-center flex-wrap gap-28  justify-center     ">

                    <Link to={'/multiplayer-offline'} className="   w-56 h-48 hover:scale-105 transition-transform duration-500  ">
                        <img
                            alt="Tee"
                            src="https://cdn-icons-png.flaticon.com/512/3550/3550826.png"
                            className="  invert h-fit w-fit "
                        />
                        <p className=" text-white text-2xl font-bold text-center mt-2 " >Offline Multiplayer</p>
                    </Link>
                    <Link to={'/tictactoe-online'} className=" w-56 h-48 hover:scale-105 transition-transform duration-500  ">
                        <img
                            alt="Tee"
                            src="https://cdn-icons-png.flaticon.com/512/4291/4291701.png"
                            className="invert h-fit w-fit  "
                        />
                        <p className=" text-white text-2xl font-bold text-center mt-2 " >Online Multiplayer</p>
                    </Link>
                    <Link to={'/vs-ai'} className=" w-56 bg-blue-900 h-48 hover:scale-105 transition-transform duration-500  ">
                        <img
                            alt="Tee"
                            src="https://cdn-icons-png.flaticon.com/512/3550/3550818.png"
                            className="invert  h-fit w-fit "
                        />
                        <p className=" text-white text-2xl font-bold text-center mt-2 " >VS Computer</p>
                    </Link>
                </div>
            </div>



        </>
    )
}
