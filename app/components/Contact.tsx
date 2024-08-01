'use client'
import React from "react"
import { FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="min-h-screen flex flex-col justify-center items-center"
        >
            <div className="w-full max-w-4xl flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
                <h2 className="ttext-4xl sm:text-4xl md:text-5xl font-bold pb-8 text-center">CONTACT</h2>
                <p className="text-sm font-normal sm:text-base md:text-lg lg:text-xl text-center max-w-2xl">
                    I&apos;m always seeking growth opportunities in computer science and open source. If you think I could contribute to your project or organization,
                    please reach out to me at the email below. I look forward to connecting with you!
                </p>
                <div className="flex flex-col items-center mt-4">
                    <a href="mailto:your-email@example.com" className="flex items-center text-lg">
                        <FaEnvelope className="mr-2 text-3xl" /> akashpotti07@gmail.com
                    </a>

                </div>
            </div>
        </motion.div>
    )
}
export default Contact;
