import React from 'react';
import PropTypes from 'prop-types';
import EmailSection from '../../../components/HomeComponents/EmailSection';
import { ScrollRestoration } from 'react-router-dom';


const Contact = () => {
    return (
        <div className='pt-32'>
            <EmailSection />
            <ScrollRestoration />
        </div>
    );
};


Contact.propTypes = {

};


export default Contact;
