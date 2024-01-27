import { Grid } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header(props){
    const isAuthenticated = props.isAuthenticated; 
    return (
            <div className='absolute w-full inset-x-0 inset-y-5 h-fit text-white'>
                <div className='flex items-center justify-between h-full text-white gap-2 px-8 mx-auto max-w-7xl'>
                    <Link to="/">
                        <div className='flex flex-row font-bold text-2xl items-center justify-center gap-2'><Grid size={40} strokeWidth={1} absoluteStrokeWidth/>Anonymous</div>
                    </Link>
                    {isAuthenticated && <div className='text-xl font-medium text-white'>Welcome, Bhati</div>}
                </div>
            </div>
    )
}