
import PropTypes from 'prop-types';


const Heading = ({ title }) => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-[#2B6777] mb-6 text-center">{title}</h1>
        </div>
    );
};


Heading.propTypes = {
    title: PropTypes.string.isRequired,
};


export default Heading;
