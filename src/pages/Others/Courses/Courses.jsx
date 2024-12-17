import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Heading from '../../../components/Shared/Heading';
import { Link, ScrollRestoration } from 'react-router-dom';

   // Function to fetch courses
const fetchCourses = async () => {
    const response = await axios.get('/courses.json');
    return response.data;
};

const Courses = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // TanStack Query (v5)
    const { data: courses = [], isLoading, error } = useQuery({
        queryKey: ['courses'],
        queryFn: fetchCourses,
    });

    // Extract unique categories from courses
    const categories = ['all', ...new Set(courses.map(course => course.category))];

    // Filter courses based on selected category
    const filteredCourses =
        selectedCategory === 'all'
            ? courses
            : courses.filter(course => course.category === selectedCategory);

    if (isLoading) return <p>Loading courses...</p>;
    if (error) return <p>Error fetching courses.</p>;

    return (
        <div className=" min-h-screen py-8 px-4 sm:px-6 lg:px-8 pt-32">
            <Heading title='All Courses' />
            {/* Category Tabs */}
            <div className="mb-6 flex justify-center space-x-4">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-2 text-sm font-medium ${selectedCategory === category
                            ? 'bg-secondary rounded-full text-white'
                            : 'bg-white text-secondary border rounded-full border-secondary'
                            } hover:bg-secondary hover:text-white transition-colors`}
                    >
                        {category === 'all' ? 'All Courses' : category.replace('-', ' ')}
                    </button>
                ))}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                    <div key={course.id} className="bg-white p-4 rounded-lg shadow border space-y-4">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-44 object-cover rounded-md mb-4"
                        />
                        <h4 className="italic capitalize text-gray-700 font-medium">{course.category}</h4>
                        <h2 className="text-xl text-primary font-semibold mb-2">{course.title}</h2>
                        <p className="text-gray-600 italic">{course.description}</p>
                        <Link to={'/courses/_id'}>
                        <button className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg w-full hover:bg-primary">
                            View Details
                        </button>
                        </Link>
                    </div>
                ))}
            </div>
            <ScrollRestoration />
        </div>
    );
};

Courses.propTypes = {
    // No props passed currently
};

export default Courses;
