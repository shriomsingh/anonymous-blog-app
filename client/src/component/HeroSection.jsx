import { ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection(){
    return(
        <div className="text-white flex flex-col items-center justify-center w-full h-screen ">
            <div className="flex flex-row items-center justify-center w-56 h-10 mb-6 text-sm font-light border border-[#292929] rounded-full gap-2 hover:border-white"><Rocket fill="white" />For Indian Users Only</div>
            <p className="text-5xl font-bold text-white mb-6 w-2/4 leading-tight text-center">Start posting anonymously where no one will judge.</p>
            <p className="text-white font-thin text-xl">Welcome to Stranger discussion forum</p>
            <Link to="/register">
                <button className="flex flex-row items-center justify-center  mt-12 w-64 h-12 rounded-full bg-[#404040] hover:bg-white hover:text-black">Create Your Account <ArrowRight className="ml-1" /></button>
            </Link>
            <p className="font-thin text-sm mt-3">Already have account? 
                <Link to="/login">
                    <span className="underline">Login</span>
                </Link>
            </p>
        </div>
    )
}