import PropTypes from 'prop-types';
import { ScrollRestoration } from 'react-router-dom';
import IconSection from '../../../components/HomeComponents/IconSection';
import Heading from '../../../components/Shared/Heading';

const About = () => {
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-32">
            <div className="w-4/5 mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
                {/* <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
                    About Us
                </h1> */}
                <Heading title='About Us' />
                <p className="text-gray-700 text-lg leading-relaxed">
                    TalentGrowAcademy is a trusted and innovative online platform designed to empower individuals to learn and earn from the comfort of their homes using just their smartphones. It offers a simple and effective way to utilize your free time productively, helping you build a sustainable career while enhancing your skills.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                    With TalentGrowAcademy, you can learn in your native language, making the process easy and accessible for everyone. Our platform enables you to earn by selling a variety of courses, services, and products within our growing community. It’s not just about earning; it’s about building a career that aligns with your goals and talents.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                    In addition to offering practical skills, TalentGrowAcademy helps you showcase your abilities, just like you would on platforms such as Facebook, YouTube, Instagram, and TikTok. As a comprehensive e-learning and digital marketing platform, it enables you to improve your performance, enhance your creativity, and unlock new opportunities.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Join TalentGrowAcademy today and take the first step toward a brighter and more prosperous future!
                </p>
                <IconSection />
            </div>
            <ScrollRestoration />
        </div>
    );
};

// PropTypes validation
About.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default About;
