'use client';

import Name from './Name';
import Tech from './Tech';
import Project from './Project';
import Contact from './Contact';
import Footer from './Footer';

const Wrapper = () => {
    return (
        <div className='overflow-y-scroll snap-y snap-mandatory'>
            <div className="flex flex-col space-y-8">
                <div className="flex justify-center items-center">
                    <Name />
                </div>
                <div className="flex justify-center items-center">
                    <Tech />
                </div>
                <div className="flex justify-center items-center">
                    <Project />
                </div>
                <div className="flex justify-center items-center">
                    <Contact />
                </div>
                <div className="flex justify-center items-center">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Wrapper;
