import { SendHorizonal } from "lucide-react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

export function CreatePost(){

    const ShowToast = () => toast.success("Successfully Submitted Post!!");
    return(
            <div className="container bg-[#201f1f] w-[554px] h-auto min-h-[530px] relative inset-x-[600px] inset-y-36 rounded-lg text-white p-2 overflow-auto ">
                <p className="text-white font-bold text-lg ml-2">Create Post</p>
                <input type="text" className="bg-white bg-opacity-5 w-[486px] min-h-12 max-h-32 scrollbar-hide rounded-lg mt-5 ml-6 p-2 text-white placeholder:text-white placeholder:font-normal placeholder:opacity-20 focus:outline-none focus:placeholder-transparent" placeholder="Post Title..." />
                <textarea className="container bg-white bg-opacity-5 w-[486px] min-h-[270px] max-h-[500px] overflow-scroll scrollbar rounded-lg mt-5 ml-6 p-2 scrollbar-hide  text-white placeholder:text-white placeholder:font-normal placeholder:text-start placeholder:opacity-20 focus:outline-none focus:placeholder-transparent" placeholder="Describe your post..." />    
                <div className="flex items-center justify-center">
                    <Link to="/posts">
                                <button className="flex flex-row items-center justify-center text-white mt-5 w-64 h-12 rounded-full bg-[#404040] hover:bg-white hover:text-black" onClick={ShowToast}>Post Submit <SendHorizonal className="ml-1" /></button>
                    </Link>
                </div>
            </div>
    )
}