import React from 'react';
import { useNavigate } from 'react-router-dom';
import motion from '../assets/motion.png';
import logo from '../assets/logo.png';

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
            <div
                className="w-screen bg-darkgreen text-left flex flex-col items-start border-b-8 border-lightgreen relative px-4">
                <img src={motion} alt="motion run letter logo" className="self-center"/>

            </div>
        </>
    )
}