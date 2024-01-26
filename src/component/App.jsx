import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { Header } from './Header';
import { CreateAccount } from './CreateAccount';
import { Otp } from './OtpVerfication';
import { AccountCreated } from './AccountCreated';
import { SideNavBar } from './SideNavBar';
import { useState } from 'react';
import { CreatePost } from './CreatePost';


export function App(){
    const [isAuthenticated, setIsAuthenticated] = useState(true);


    const toggleAuthentication = () =>{
        setIsAuthenticated(!isAuthenticated);
    }

    return(
        <div className='w-screen h-screen bg-gradient-radial from-[#111111] from-5% via-[#111111] via-20% to-black'>
            <Router>
                <Header isAuthenticated={isAuthenticated}/>
                {isAuthenticated && <SideNavBar />}
                <Routes>    
                    <Route path="/" element={<HeroSection/>}></Route>
                    <Route path="/register" element={<CreateAccount />}> </Route>
                    <Route path="/otp" element={<Otp />}> </Route>
                    <Route path="/username" element={<AccountCreated toggleAuthentication={toggleAuthentication}/>}> </Route>
                    <Route path="/username/create" element={<CreatePost />}> </Route>
                </Routes>
            </Router>
        </div>
    )
}