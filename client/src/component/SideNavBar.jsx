import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function SideNavBar(){
    return(
        <div className="flex flex-col items-center justify-start absolute w-72 h-1/2 inset-x-52 inset-y-36">
        <div className="flex flex-col items-center justify-center text-white gap-5">
        <Link to="/posts">
            <button className="flex flex-row items-center justify-start pl-6 w-64 h-14 rounded-lg bg-[#404040] hover:bg-[#4a4949] focus:bg-white focus:text-black focus:font-medium">All Post</button>
        </Link>
        <Link to="/username/posts/commented">    
            <button className="flex flex-row items-center justify-start pl-6 w-64 h-14 rounded-lg bg-[#404040] hover:bg-[#4a4949] focus:bg-white focus:text-black focus:font-medium">Your Commented Post</button>
        </Link>
        <Link to="/username/posts/replies">    
            <button className="flex flex-row items-center justify-start pl-6 w-64 h-14 rounded-lg bg-[#404040] hover:bg-[#4a4949] focus:bg-white focus:text-black focus:font-medium">Your Replied Post</button>
        </Link>
        </div>
        <Link to="username/create">
            <button className="flex flex-row items-center justify-start mt-10 pl-6 w-64 h-14 rounded-lg gap-2 text-white text-opacity-50 bg-transparent border-2 border-[#404040] hover:bg-white hover:bg-opacity-10 hover:border-white hover:border-opacity-45 focus:bg-white focus:text-black focus:font-medium"><PlusCircle /> Create Post</button>
        </Link>
        </div>
    )
}