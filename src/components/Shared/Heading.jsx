import React from 'react';
import PropTypes from 'prop-types';


const Heading = ({ title }) => {
    return (
        <div>
            <h1 className="text-4xl font-semibold text-primary text-center">{title}</h1>
        </div>
    );
};


Heading.propTypes = {

};


export default Heading;
