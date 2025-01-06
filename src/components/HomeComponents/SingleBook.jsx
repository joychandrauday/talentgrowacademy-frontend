import React, { useState, useEffect } from 'react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import axios from 'axios';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { BsStars } from 'react-icons/bs';
import useUser from '../../pages/Others/Register/useUser';
import LoadingSpinner from '../Shared/LoadingSpinner';

const SingleBook = () => {
    const { id } = useParams(); // Get the book ID from the URL parameter
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewCount, setViewCount] = useState(0);
    const axiosPublic = useAxiosPublic();
    const { userdb } = useUser();

    // Fetch book data
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axiosPublic.get(`/books/${id}`);
                setBook(response.data);
                setViewCount(response.data.views); // Set the initial view count
                setLoading(false);
            } catch (error) {
                setError('Error fetching book data');
                setLoading(false);
            }
        };

        fetchBookData();
    }, [id]); // Run this effect only when the id changes

    // Increment view count only once when the component is mounted
    useEffect(() => {
        if (book) {
            // Update the view count once when the book data is loaded
            const incrementViewCount = async () => {
                try {
                    await axiosPublic.put(`/books/${id}`, { views: book.views + 1 });
                } catch (error) {
                    console.error('Error incrementing view count', error);
                }
            };

            incrementViewCount();
        }
    }, [book, id]); // This effect runs only after book data is set

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Check if the book is premium and if the user is active
    const isPremium = book?.premium;
    const isUserActive = userdb.status === 'active';

    return (
        <div className="md:max-w-4xl mx-auto p-6 pt-20 space-y-6 bg-white shadow-lg rounded-xl mt-10">
            {
                // Check if the book is premium and if the user is active
                isPremium && !isUserActive ? (
                    <h1 className="text-3xl font-bold text-indigo-600">Please activate your account to access premium books.</h1>
                ) : (
                    <>
                        {/* Title and Basic Information */}
                        <div className="text-center relative">
                            <h1 className="text-3xl font-bold text-indigo-600">{book.title}</h1>
                            <p className="text-xl text-gray-700">{book.author}</p>
                            <p className="text-sm badge bg-secondary text-white">Views: {viewCount}</p>
                            {isPremium && <span className="badge badge-warning absolute top-0 right-0"> premium <BsStars /></span>}
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Description</h2>
                            <p className="text-gray-700">{book.description}</p>
                        </div>

                        {/* PDF Reader */}
                        <div className="border-t border-gray-300 pt-6 space-y-4">
                            <h2 className="text-2xl font-semibold">Read the Book</h2>
                            <div className="relative">
                                <iframe
                                    src={`${book.fileUrl}#toolbar=0&zoom=page-width`}
                                    width="100%"
                                    height="600px"
                                    title={book.title}
                                />

                            </div>
                        </div>
                    </>
                )
            }
            <ScrollRestoration />
        </div>
    );
};

export default SingleBook;
