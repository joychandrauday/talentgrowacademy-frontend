import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollRestoration } from 'react-router-dom';
import axios from 'axios';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { BsStars } from 'react-icons/bs';

const AllBooks = () => {
    const [books, setBooks] = useState([]); // State to store books
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const axiosPublic = useAxiosPublic();

    // Fetch books data from the backend
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axiosPublic.get('/books');
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching books');
                setLoading(false);
            }
        };

        fetchBooks();
    }, [axiosPublic]); // Fetch books only once on component mount

    // Render loading or error state if applicable
    if (loading) {
        return <div className="text-center text-xl font-semibold">Loading Books...</div>;
    }

    if (error) {
        return <div className="text-center text-xl font-semibold text-red-600">{error}</div>;
    }

    return (
        <div className="container mt-20 mx-auto p-6 space-y-6 bg-white shadow-lg rounded-xl ">
            <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">All Books</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div key={book._id} className="bg-gray-100 p-4 rounded-lg shadow-md relative">
                        {/* Book Image */}
                        <div className="mb-4">
                            <img
                                src={book.bookImage || 'https://via.placeholder.com/150'}
                                alt={book.title}
                                className="w-full h-48 object-cover rounded-md"
                            />
                        </div>
                        {
                            book.premium &&
                            <span className="badge badge-warning absolute top-0 right-0"> premium <BsStars /></span>
                        }
                        {/* Title and Author */}
                        <h2 className="text-xl font-semibold text-indigo-600">{book.title}</h2>
                        <p className="text-sm text-gray-600">By {book.author}</p>

                        {/* Description */}
                        <p className="text-sm text-gray-500 mt-2">{book.description}</p>

                        {/* Views */}
                        <p className="text-sm text-gray-500 mt-2">Views: {book.views}</p>

                        {/* Link to the single book page */}
                        <a href={`/books/${book._id}`} className="text-white btn bg-primary mt-4 w-full text-center">
                            Read more
                        </a>
                    </div>
                ))}
            </div>

            <ScrollRestoration />
        </div>
    );
};

AllBooks.propTypes = {};

export default AllBooks;
