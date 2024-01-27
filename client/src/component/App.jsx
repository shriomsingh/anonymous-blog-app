import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { Header } from './Header';
import { CreateAccount } from './CreateAccount';
import { Otp } from './OtpVerfication';
import { AccountCreated } from './AccountCreated';
import { SideNavBar } from './SideNavBar';
import { useState } from 'react';
import { CreatePost } from './CreatePost';
import { AllPost } from './AllPost';
import { CommentedPosts } from './CommentedPosts';
import { RepliedPosts } from './RepliedPosts';
import { Toaster } from 'react-hot-toast';


export function App(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const toggleAuthentication = () =>{
        setIsAuthenticated(!isAuthenticated);
    }

    return(
        <div className='w-screen h-auto min-h-screen overflow-y-auto overflow-x-none scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-500 bg-gradient-radial from-[#111111] from-5% via-[#111111] via-20% to-black'>
            <Router>
                <Header isAuthenticated={isAuthenticated}/>
                {isAuthenticated && <SideNavBar />}
                <Routes>    
                    <Route path="/" element={<HeroSection/>}></Route>
                    <Route path="/register" element={<CreateAccount />}> </Route>
                    <Route path="/otp" element={<Otp />}> </Route>
                    <Route path="/username" element={<AccountCreated toggleAuthentication={toggleAuthentication}/>}> </Route>
                    <Route path="/posts" element={<AllPost />}> </Route>
                    <Route path="/username/posts/commented" element={<CommentedPosts />}> </Route>
                    <Route path="/username/posts/replies" element={<RepliedPosts />}> </Route>
                    <Route path="/username/create" element={<CreatePost />}> </Route>
                    
                </Routes>
                <Toaster position='bottom-right'/>
            </Router>
        </div>
    )
}