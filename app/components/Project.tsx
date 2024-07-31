"use client";

import Card from "./Card";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const ProjectSection = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });
    const projects = [
        {
            name: "Eyantra GeoGuide",
            description:
                "Successfully implemented the Eyantra GeoGuide Theme and was placed in the top 20 across the country",
            github:
                "https://github.com/Akash-Potti/GeoGuide-Eyrc-2023-Final-Theme-Implementation",
        },
        {
            name: "Leaf Disease Segmentation",
            description: "Leaf Disease Segmentation Using DeepLabV3",
            github:
                "https://github.com/Akash-Potti/Leaf-Disease-Segmentation-with-DeepLabV3",
        },
        {
            name: "Medical Recommendation System",
            description:
                "A web-based Medical Recommendation System which helps users diagnose their medical condition.",
            github: "https://github.com/Akash-Potti/Medical-Recomendation-System",
        },
        {
            name: "Geospatial Context Retrieval",
            description:
                "Web-based geospatial context retrieval system using LLMs and a graph database",
            github: "",
        },
        {
            name: "Community Hub",
            description:
                "A community hub for people to share their thoughts inspired by Reddit",
            github: "https://github.com/Akash-Potti/Reddit-Clone",
        },
    ];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
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
            transition={{ duration: 1, ease: 'easeOut' }}>
            <div className="flex flex-col w-full justify-center items-center">
                <h3 className="text-4xl md:text-6xl font-bold mb-4">PROJECTS</h3>
                <div className="hidden md:grid grid-cols-3 gap-y-10 gap-x-10 pt-10 justify-center">
                    {projects.map((project, index) => (
                        <Card
                            key={index}
                            name={project.name}
                            description={project.description}
                            github={project.github}
                        />
                    ))}
                </div>
                <div className="md:hidden w-full overflow-hidden relative p-8 ">
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container flex">
                            {projects.map((project, index) => (
                                <div className="embla__slide flex-none w-full" key={index}>
                                    <div className="flex justify-center">
                                        <Card
                                            name={project.name}
                                            description={project.description}
                                            github={project.github}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Navigation Dots */}
                    <div className="flex justify-center mt-4">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 mx-1 rounded-full ${index === selectedIndex ? "bg-black" : "bg-gray-300"
                                    }`}
                                onClick={() => scrollTo(index)}
                            />
                        ))}
                    </div>
                </div>
                {/* Inline Styles for Embla Carousel */}
                <style jsx>{`
                .embla {
                    overflow: hidden;
                }

                .embla__container {
                    display: flex;
                }

                .embla__slide {
                    position: relative;
                    min-width: 100%;
                    box-sizing: border-box;
                }
            `}</style>
            </div>
        </motion.div>
    );
};

export default ProjectSection;
