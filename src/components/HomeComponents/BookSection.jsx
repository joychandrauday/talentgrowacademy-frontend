import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiEye } from 'react-icons/fi';
import { BsStarFill } from 'react-icons/bs';
import Heading from '../Shared/Heading';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const BookSection = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch books using TanStack Query
    const fetchBooks = async () => {
        const { data } = await axiosPublic.get('/books'); // Fetch only the first 6 books
        return data;
    };

    const { data: books = [], isLoading, error } = useQuery({
        queryKey: ['books'],
        queryFn: fetchBooks,
    });

    if (isLoading) return <div>Loading books...</div>;
    if (error) return <div>Error loading books: {error.message}</div>;

    return (
        <div className="my-20">
            <Heading title="E-Book Library" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 w-[90%] gap-32 mx-auto">
                {books?.slice(0, 6).map((book, index) => (
                    <div key={index} className="relative flex">
                        <img
                            src={book.bookImage}
                            alt={book.title}
                            className="h-44 rounded-md mb-4 top-8 absolute left-[-55px] shadow-md shadow-black"
                        />

                        {/* Premium Icon */}
                        <div className="bg-primary text-white rounded-xl h-64 p-4 pl-20 flex flex-col justify-center">
                            {book.premium && (
                                <div
                                    className="absolute top-2 right-2 flex items-center tooltip cursor-pointer tooltip-warning"
                                    data-tip="Premium"
                                >
                                    <BsStarFill className="h-5 text-secondary w-5 mr-1" />
                                </div>
                            )}

                            <h3 className="text-lg font-semibold">{book.title}</h3>
                            <p className="text-gray-600">{book.author}</p>
                            <p className="mt-2 text-sm text-gray-500">{book.description}</p>

                            {/* View Count and Rating */}
                            <div className="mt-3 text-gray-500 text-sm flex items-center justify-between">
                                <div className="flex items-center">
                                    <FiEye className="h-5 w-5 mr-1 text-gray-400" />
                                    <span>{book.views} views</span>
                                </div>
                            </div>

                            {/* Detail Button */}
                            <Link
                                to={`/books/${book._id}`}
                                className="mt-4 w-full bg-secondary text-white py-2 px-4 rounded-none hover:bg-blue-600 transition duration-300 text-center"
                            // Add onClick logic if needed
                            >
                                Read Now
                            </Link>
                        </div>
                    </div>
                ))}

            </div>
            <div className="text-center mt-12">

                <Link
                    to={"/books"}
                    className="w-full bg-primary text-xl text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 text-center"
                // Add onClick logic if needed
                >
                    All books
                </Link>
            </div>
        </div>
    );
};

export default BookSection;
