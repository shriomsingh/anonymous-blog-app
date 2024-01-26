import { ArrowRight} from "lucide-react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import emailVerification from "../lotties/emailVerification.json";

export function AccountCreated(props){
    const toggleAuthentication = props.toggleAuthentication;
    return(
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-drop-shadow-lg w-96 h-96 rounded-3xl">
                <div className="flex flex-col justify-center items-center text-white font-medium text-xl">
                    <div className="flex items-center justify-center w-40 h-20 mt-10 mb-2">
                        <Lottie
                            animationData={emailVerification}
                            loop={true}
                            autoplay={true}
                            controls={false}
                        />
                    </div>
                    <p className="text-white w-64 text-center text-2xl">Account Created Successfully</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    
                    <Link to="/username/create">
                        <button className="flex flex-row items-center justify-center text-white mt-10 w-64 h-12 rounded-full bg-[#404040] hover:bg-white hover:text-black" onClick={toggleAuthentication}>Continue <ArrowRight className="ml-1" /></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}