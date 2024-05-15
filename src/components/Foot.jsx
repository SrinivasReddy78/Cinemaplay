import React from 'react'
import { LuCopyright } from "react-icons/lu";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Foot = () => {
    return (
        <>
            <footer className='bg-zinc-800 px-8 py-4 text-white font-secondFont flex items-center justify-between max-[640px]:flex-col max-[640px]:gap-6'>
                <div className="text-center py-2 max-[640px]:border-b max-[640px]:w-full">
                    <div className="logo text-4xl font-bold mb-4">Cinemaplay</div>
                    <p className='flex items-center gap-2 justify-center'><LuCopyright />All rights recieved</p>
                </div>
                <div className="info w-2/6 text-center max-[640px]:w-4/5">
                    <p>Cinemaplay is free tv shows streaming website with zero ads, it allows you watch tv shows online, watch tv shows online free in high quality for free.</p>
                </div>
                <div className="media flex flex-col items-center gap-4">
                    <div className="social flex items-center gap-4 text-3xl">
                        < FaInstagram />
                        < FaTwitter />
                        < FaYoutube />
                    </div>
                    <p>Support us - Cinemaplay@gmail.com</p>
                </div>
            </footer>
        </>
    )
}

export default Foot
