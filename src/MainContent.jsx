import React from 'react';
import logo from './assets/logo.png';
import money from './assets/money.png';
import cursor from './assets/cursor.png';
import phone from './assets/phone.png';
import { motion } from 'framer-motion';



export default function MainContent() {
    return(
        <>

            <div className='bg-offwhite pt-16 px-6'>
                <h2 className='text-darkgreen font-bold text-2xl'>How it Works</h2>
                <hr className="my-4 h-0.5 border-t-0 bg-darkgreen "/>
                <p className='text-darkgreen text-xl'>The app, with the help of AI, will analyze the food you have taken
                    a picture of and give you a rough estimate of how many calories it represents and how many steps
                    could burn them.</p>

                <h2 className='text-darkgreen font-bold text-2xl'>But why walking?</h2>
                <hr className="my-4 h-0.5 border-t-0 bg-darkgreen "/>

                <div
                    className='bg-white rounded-lg shadow-md p-6 text-center my-6 border-solid border-2 border-lightgreen'>
                    <div className='flex justify-center mb-4'>
                        <img src={money} alt='Icon 1' className='h-12'/>
                    </div>
                    <h3 className='text-darkgreen font-bold text-xl mb-2'>Walking is free!</h3>
                    <p className='text-gray-600'>Maybe in the past you couldn't afford a gym membership or these crazy
                        diets to better your health, but walking is free!</p>

                </div>

                <div
                    className='bg-white rounded-lg shadow-md p-6 text-center my-6 border-solid border-2 border-lightgreen'>
                    <div className='flex justify-center mb-4'>
                        <img src={cursor} alt='Icon 1' className='h-12'/>
                    </div>
                    <h3 className='text-darkgreen font-bold text-xl mb-2'>You can walk anywhere anytime!</h3>
                    <p className='text-gray-600'>You are on your lunch break? Go for a walk! You're at home and got
                        nothing to do? Walk! Don't feel like driving to your gym? Go for a walk!</p>

                </div>

                <div
                    className='bg-white rounded-lg shadow-md p-6 text-center mt-6 border-solid border-2 border-lightgreen'>
                    <div className='flex justify-center mb-4'>
                        <img src={phone} alt='Icon 1' className='h-12'/>
                    </div>
                    <h3 className='text-darkgreen font-bold text-xl mb-2'>It's pretty easy to keep track!</h3>
                    <p className='text-gray-600'>There are many apps like Google Fit and Samsung Health that will keep
                        track of your steps for you, so you don't even have to worry about it!</p>

                </div>
            </div>
        </>
    )
}