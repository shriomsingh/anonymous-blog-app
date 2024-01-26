import { PlusCircle } from "lucide-react";

export function SideNavBar(){
    return(
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-start absolute w-72 h-1/2 inset-x-52 inset-y-36">
            <div className="flex flex-col items-center justify-center text-white gap-5">
                <button className="flex flex-row items-center justify-start pl-6 w-64 h-14 rounded-lg bg-[#404040] hover:bg-[#4a4949]">All Post</button>
                <button className="flex flex-row items-center justify-start pl-6 w-64 h-14 rounded-lg bg-[#404040] hover:bg-[#4a4949]">Commented Post</button>
                <button className="flex flex-row items-center justify-start pl-6 w-64 h-14 rounded-lg bg-[#404040] hover:bg-[#4a4949]">Replied Post</button>
            </div>
                <button className="flex flex-row items-center justify-start mt-10 pl-6 w-64 h-14 rounded-lg gap-2 text-white text-opacity-50 bg-transparent border-2 border-[#404040] hover:bg-white hover:bg-opacity-10 hover:border-white hover:border-opacity-45"><PlusCircle /> Create Post</button>
            </div>
            <div className="w-72 h-1/2 bg-pink-500"></div>
        </div>
    )
}