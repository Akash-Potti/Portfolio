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
            >
                <section className="h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold pb-4">AKASH POTTI</h1>
                    <div className="text-lg sm:text-xl md:text-2xl pb-4">
                        Bangalore | India |{' '}
                        <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Kolkata'} />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-center">
                        Hi there👋, I am currently delving into AI/ML, Embedded Systems, Data
                        Analysis. I am also a fullstack developer with experience in
                        React, Next.js, Node, Tailwind CSS, Postgres.
                    </p>
                    <div className="flex flex-row gap-2 mt-4 items-center">
                        <a
                            className="hover:scale-125 transition duration-300 ease-in-out"
                            href=""
                        >
                            <FaSquareGithub size={30} />
                        </a>
                        <a
                            className="hover:scale-125 transition duration-300 ease-in-out"
                            href=""
                        >
                            <RxLinkedinLogo size={30} />
                        </a>
                    </div>
                </section>
            </motion.div>
        </Parallax>
    );
};

export default Name;