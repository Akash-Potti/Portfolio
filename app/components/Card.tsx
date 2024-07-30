import { FC } from 'react';
import { FaGithub } from 'react-icons/fa';

interface ProjectCardProps {
    name: string;
    description: string;
    github: string;
}
const ProjectCard: FC<ProjectCardProps> = ({ name, description, github }) => {
    return (
        <div className=' p-4 md:p-4 bg-[#ebe6e6] rounded-xl shadow-md hover:scale-[1.045] transition duration-300 ease-in-out  w-80 h-80 flex flex-col justify-between'>
            <h1 className='text-xl font-extrabold mb-2 '>{name}</h1>
            <p className="mb-4 font-semibold">{description}</p>
            <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:font-bold text-gray-800"
            >
                <FaGithub className="mr-2  " /> View On GitHub
            </a>
        </div>
    );
}

export default ProjectCard;