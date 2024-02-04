import { ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export function CreateAccount(){
    return(
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-drop-shadow-lg w-96 h-96 rounded-3xl">
                <div className="flex flex-col justify-center items-center text-white font-medium text-xl">
                    <Rocket fill="white" size={30} className="text-white mt-10 mb-4" />
                    <p className="text-white">Create Your Account</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <input type="text" className="bg-transparent border border-opacity-25 border-white  w-64 h-10 rounded-xl mt-10 mb-2 p-2  text-white placeholder:text-white placeholder:font-normal placeholder:opacity-20 focus:outline-none focus:placeholder-transparent" placeholder="Enter Your Username..." />
                    <input type="text" className="bg-transparent border border-opacity-25 border-white  w-64 h-10 rounded-xl mt-5 mb-2 p-2 text-white placeholder:text-white placeholder:opacity-20 focus:outline-none focus:placeholder-transparent" placeholder="Enter Your Email..." />
                    <Link to="/otp">
                        <button className="flex flex-row items-center justify-center text-white mt-5 w-64 h-12 rounded-full bg-[#404040] hover:bg-white hover:text-black">Create Your Account <ArrowRight className="ml-1" /></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
