import { ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function LoginComponent(props){
    const toggleAuthentication = props.toggleAuthentication;
    const [eye, setEye] = useState(false)

    function toggleEye(){
        setEye(!eye);
    }

    return(
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-drop-shadow-lg w-96 h-96 rounded-3xl">
                <div className="flex flex-col justify-center items-center text-white font-medium text-xl">
                    <KeyRound size={30} className="text-white mt-10 mb-4" />
                    <p className="text-white">Log Into Your Account</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <input type="text" className="bg-transparent border border-opacity-25 border-white  w-64 h-10 rounded-xl mt-10 mb-2 p-2  text-white placeholder:text-white placeholder:font-normal placeholder:opacity-20 focus:outline-none focus:placeholder-transparent" placeholder="Enter Your Username..." />
                    <div className="relative">
                        <input type={eye ? "text" : "password"} className="bg-transparent border border-opacity-25 border-white  w-64 h-10 rounded-xl mt-5 mb-2 p-2 text-white placeholder:text-white placeholder:opacity-20 focus:outline-none focus:placeholder-transparent" placeholder="Enter Your Password..." />
                        <button onClick={toggleEye} aria-label={eye ? "Hide Password" : "Show Password"} className="absolute inset-y-6 right-0 pr-3 pt-2.5 flex justify-center items-center">{eye ? <Eye size={20} className="text-white"/> : <EyeOff size={20} className="text-white"/>}</button>
                    </div> 
                    <Link to="/posts">
                        <button className="flex flex-row items-center justify-center text-white mt-5 w-64 h-12 rounded-full bg-[#404040] hover:bg-white hover:text-black" onClick={toggleAuthentication}>Login <ArrowRight className="ml-1" /></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
