'use client';
import { FaSquareGithub } from 'react-icons/fa6';
import { RxLinkedinLogo } from 'react-icons/rx';
import Clock from 'react-live-clock';
import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';

const Name = () => {
    return (
        <Parallax speed={10}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="min-h-screen flex justify-center items-center overflow-hidden"
            >
                <div className="w-full max-w-4xl flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
                    <h1 className="text-4xl md:text-5xl font-bold pb-8 text-center">
                        AKASH POTTI
                    </h1>
                    <div className="text-base sm:text-lg md:text-xl lg:text-3xl pb-4 text-center">
                        Bangalore | India |{' '}
                        <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Kolkata'} />
                    </div>
                    <p className="text-sm font-normal sm:text-base md:text-lg lg:text-2xl text-center max-w-2xl">
                        Hi there👋, I am currently delving into AI/ML, Embedded Systems, Data
                        Analysis. I am also a fullstack developer with experience in
                        React, Next.js, Node, Tailwind CSS, Postgres.
                    </p>
                    <div className="flex flex-row gap-4 mt-6 ">
                        <a
                            className="shadow-xl hover:scale-110 transition duration-300 ease-in-out"
                            href="https://github.com/Akash-Potti"
                        >
                            <FaSquareGithub size={40} />
                        </a>
                        <a
                            className="shadow-xl hover:scale-110 transition duration-300 ease-in-out"
                            href="https://www.linkedin.com/in/akash-potti-434997249/"
                        >
                            <RxLinkedinLogo size={40} />
                        </a>
                    </div>
                </div>
            </motion.div>
        </Parallax >
    );
};

export default Name;
