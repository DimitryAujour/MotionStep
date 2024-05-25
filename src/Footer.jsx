import React from 'react';
import github from './assets/github.png';
import linkedin from './assets/linkedin.png';
import instagram from './assets/instagram.png'
import deepstash from './assets/deepstash.png';




export default function Footer(){
    return(
        <>
            <div className='bg-offwhite w-screen pt-16 px-6  pb-8 flex justify-around'>
                <a href="https://github.com/DimitryAujour">
                    <img src={github} alt='GitHub Icon' className='w-16 h-14'/>
                </a>
                <a href="https://www.linkedin.com/in/dimitry-aujour-34440911b/">
                    <img src={linkedin} alt='LinkedIn Icon' className='w-16 h-14'/>
                </a>
                <a href="https://deepstash.com/u/dimitryaujour">
                    <img src={deepstash} alt='Deepstash Icon' className='w-16 h-14'/>
                </a>
                <a href="https://www.instagram.com/dimitry.aujour/">
                    <img src={instagram} alt='Instagram Icon' className='w-16 h-14'/>
                </a>

            </div>
        </>
    )
}