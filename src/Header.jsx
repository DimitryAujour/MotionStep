import React from 'react';
import motion from './assets/motion.png';
import logo from './assets/logo.png';

export default function Header() {
    return (
        <>
            <div className="w-screen bg-darkgreen text-left flex flex-col items-start border-b-8 border-lightgreen relative px-4">
                <img classNmae ='ml-20'src={motion} alt="motion run letter logo" className="self-center" />
                <h1 className="text-5xl px-6 pt-1 text-lightgreen">Want an easy way to get fit?</h1>
                <p className="my-5 px-6 pb-4 text-2xl text-offwhite">
                    Motionstep is there to help you see how many steps you need to get that nice summer body you crave!
                </p>
                <button className="bg-lightgreen hover:bg-darkgreen text-offwhite font-bold py-2 px-4 rounded-full pb-4 mb-12">
                    Try the app!
                </button>

                <div className="relative flex justify-center w-full">
                    <div className="absolute bottom-[-50px] left-[calc(70%+5px)] transform translate-x-[-50%] bg-white rounded-full flex justify-center items-center p-3 border-8 border-lightgreen">
                        <img className="w-24 h-16" src={logo} alt="motion run full logo" />
                    </div>
                </div>
            </div>
        </>
    );
}
