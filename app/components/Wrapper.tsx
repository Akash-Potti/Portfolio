'use client';

import Name from './Name';
import Tech from './Tech';
import Project from './Project'
import Contact from './Contact';
import Footer from './Footer';

const Wrapper = () => {
    return (
        <div className='h-screen overflow-y-scroll snap-y snap-mandatory'>
            <div className="min-h-screenflex justify-center items-center">
                <Name />
            </div>
            <div className="min-h-screen  flex justify-center items-center">
                <Tech />
            </div>
            <div className="min-h-screen  flex justify-center items-center">
                <Project />
            </div>
            <div className="min-h-screen  flex justify-center items-center">
                <Contact />
            </div>
            <div className=" flex justify-center items-center">
                <Footer />
            </div>

        </div>
    );
};

export default Wrapper;
