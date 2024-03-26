import React from 'react';

function Tutorial() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className="w-3/4 h-3/4 flex flex-col justify-center items-center rounded-xl p-20 bg-secondary">
                <iframe
                    className='w-full h-full mb-5'
                    src="https://www.youtube.com/embed/5kAq8F1uKOQ?si=VuBJ1TVelfjKlp1Z"
                    title="Thinklabs User Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>

                <a href="/CreateProfile" className="px-10 py-4 text-xl rounded-xl text-white font-semibold bg-accent-red hover:bg-accent-blue duration-300">
                    Login
                </a>

            </div>
        </div>
    );
}

export default Tutorial;
