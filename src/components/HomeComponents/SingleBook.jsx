import React, { useState, useEffect } from 'react';
import { ScrollRestoration, useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useUser from '../../pages/Others/Register/useUser';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const SingleBook = () => {
    const { id } = useParams(); // Get the book ID from the URL parameter
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { userdb } = useUser();

    // Fetch book data
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axiosPublic.get(`/books/${id}`);
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching book data');
                setLoading(false);
            }
        };

        fetchBookData();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Check if the book is premium and if the user is active
    const isPremium = book?.premium;
    const isUserActive = userdb?.status === 'active';

    return (
        <div className="md:max-w-4xl mx-auto p-6 pt-20 space-y-6 bg-white shadow-lg rounded-xl mt-10">
            {isPremium && !isUserActive ? (
                <h1 className="text-3xl font-bold text-indigo-600">
                    Please activate your account to access premium books.
                </h1>
            ) : (
                <>
                    <div className="text-center relative">
                        <h1 className="text-3xl font-bold text-indigo-600">{book.title}</h1>
                        <p className="text-xl text-gray-700">{book.author}</p>
                        <p className="text-sm badge bg-secondary text-white">Views: {book.views}</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Description</h2>
                        <p className="text-gray-700">{book.description}</p>
                    </div>

                    <div className="border-t border-gray-300 pt-6 space-y-4">
                        <h2 className="text-2xl font-semibold">Read the Book</h2>
                        <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
                            <div
                                style={{
                                    height: '600px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                }}
                            >
                                <Viewer fileUrl={book.fileUrl} />
                            </div>
                        </Worker>
                    </div>
                </>
            )}
            <ScrollRestoration />
        </div>
    );
};

export default SingleBook;
