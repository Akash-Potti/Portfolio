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

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Define a type for techs
interface Tech {
    Icon: React.ElementType;
    label: string;
}

const Technologies = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Define techs with the correct type
    const techs: Tech[] = [
        { Icon: SiPytorch, label: 'PyTorch' },
        { Icon: SiScikitlearn, label: 'Sci-Kit Learn' },
        { Icon: SiNumpy, label: 'NumPy' },
        { Icon: SiPandas, label: 'Pandas' },
        { Icon: FaPython, label: 'Python 3' },
        { Icon: FaReact, label: 'React' },
        { Icon: RiNextjsFill, label: 'Next.js' },
        { Icon: RiTailwindCssFill, label: 'Tailwind CSS' },
        { Icon: IoLogoJavascript, label: 'JavaScript' },
        { Icon: SiMongodb, label: 'MongoDB' },
        { Icon: SiExpress, label: 'Express.js' },
        { Icon: FaNodeJs, label: 'Node.js' },
        { Icon: FaHtml5, label: 'HTML5' },
        { Icon: FaCss3, label: 'CSS3' },
        { Icon: FaGitAlt, label: 'Git' },
        { Icon: SiCplusplus, label: 'C++' },
        { Icon: TbBrandMysql, label: 'MySQL' },
    ];

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="min-h-screen flex flex-col justify-center items-center"
        >
            <section className="w-full max-w-5xl flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
                <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold pb-8 text-center">
                    TECHNOLOGIES
                </h1>
                <div className="hidden md:grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
                    {techs.map((tech, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-[#ebe6e6] items-center justify-center p-4 border rounded-lg shadow-md hover:scale-[1.045] transition duration-300 ease-in-out"
                        >
                            <tech.Icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
                            <p className="mt-2 text-center text-xs sm:text-sm md:text-base lg:text-lg">
                                {tech.label}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="md:hidden w-full overflow-hidden relative">
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container flex">
                            {techs
                                .reduce((acc: Tech[][], tech, index) => {
                                    if (index % 4 === 0) acc.push([]);
                                    acc[acc.length - 1].push(tech);
                                    return acc;
                                }, [])
                                .map((techGroup, slideIndex) => (
                                    <div
                                        className="embla__slide flex-none w-full"
                                        key={slideIndex}
                                    >
                                        <div className="grid grid-cols-2 gap-4 p-4">
                                            {techGroup.map((tech, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col bg-[#ebe6e6] items-center justify-center p-4 border rounded-lg shadow-md hover:scale-[1.045] transition duration-300 ease-in-out"
                                                >
                                                    <tech.Icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
                                                    <p className="mt-2 text-center text-xs sm:text-sm md:text-base lg:text-lg">
                                                        {tech.label}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {/* Navigation Dots */}
                    <div className="flex justify-center mt-4">
                        {techs
                            .reduce((acc: number[], _, index) => {
                                if (index % 4 === 0) acc.push(index / 4);
                                return acc;
                            }, [])
                            .map((_, slideIndex) => (
                                <button
                                    key={slideIndex}
                                    className={`w-3 h-3 mx-1 rounded-full ${slideIndex === selectedIndex
                                        ? 'bg-blue-500'
                                        : 'bg-gray-300'
                                        }`}
                                    onClick={() => scrollTo(slideIndex)}
                                />
                            ))}
                    </div>
                </div>
            </section>
            {/* Inline Styles for Embla Carousel */}
            <style jsx>{`
                .embla {
                    overflow: hidden;
                }

                .embla__container {
                    display: flex;
                }

                .embla__slide {
                    box-sizing: border-box;
                }

                .embla__prev,
                .embla__next {
                    width: 2.5rem;
                    height: 2.5rem;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #ddd;
                }
            `}</style>
        </motion.div>
    );
};

export default Technologies;
