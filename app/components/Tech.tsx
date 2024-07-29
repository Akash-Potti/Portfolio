'use client';
import {
    FaReact,
    FaGitAlt,
    FaNodeJs,
    FaHtml5,
    FaCss3,
    FaPython,
} from 'react-icons/fa';
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri';
import {
    SiScikitlearn,
    SiMongodb,
    SiExpress,
    SiCplusplus,
    SiPandas,
    SiNumpy,
    SiFlask,
    SiPytorch,
} from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io';
import { TbBrandMysql } from 'react-icons/tb';

import { Parallax } from 'react-scroll-parallax';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Technologies = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const techs = [
        { Icon: SiPytorch, label: 'Py-Torch' },
        { Icon: SiScikitlearn, label: 'Sci-Kit Learn' },
        { Icon: SiNumpy, label: 'Numpy' },
        { Icon: SiPandas, label: 'Pandas' },
        { Icon: FaPython, label: 'Python 3' },
        { Icon: SiNumpy, label: 'Numpy' },
        { Icon: SiPandas, label: 'Pandas' },
        { Icon: FaReact, label: 'React' },
        { Icon: RiNextjsFill, label: 'NextJS' },
        { Icon: RiTailwindCssFill, label: 'TailwindCSSv3' },
        { Icon: IoLogoJavascript, label: 'Javascript' },
        { Icon: SiMongodb, label: 'MongoDB' },
        { Icon: SiExpress, label: 'ExpressJS' },
        { Icon: FaNodeJs, label: 'NodeJS' },
        { Icon: FaHtml5, label: 'HTML5' },
        { Icon: FaCss3, label: 'CSS3' },
        { Icon: FaGitAlt, label: 'Git' },
        { Icon: SiCplusplus, label: 'C++' },
        { Icon: TbBrandMysql, label: 'My SQL' },
    ];

    return (
        <Parallax speed={-10}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <section className="h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold pb-8">TECHNOLOGIES</h1>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                        {techs.map((tech, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-lg"
                            >
                                <tech.Icon size={30} />
                                <p className="mt-2 text-sm">{tech.label}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </motion.div>
        </Parallax>
    );
};

export default Technologies;