import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FiEye } from 'react-icons/fi';
import { BsStarFill } from 'react-icons/bs';

const fetchBooks = async () => {
    const { data } = await axios.get('/books.json'); // Assuming books.json is in the public folder
    return data;
};

const BookSection = () => {
    const { data: books, isLoading, error } = useQuery({
        queryKey: ['books'],
        queryFn: fetchBooks,
    });

    if (isLoading) return <div>Loading books...</div>;
    if (error) return <div>Error loading books: {error.message}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  p-4 w-[90%] gap-32 mx-auto">
            {books.slice(0, 6).map((book, index) => (


                <div key={index} className="relative flex">
                    <img
                        src={book.image}
                        alt={book.title}
                        className=" h-44
                       rounded-md mb-4 top-8 absolute left-[-55px]"
                    />

                    {/* Premium Icon */}
                    <div className="bg-primary text-white rounded-xl h-64 p-4 pl-20 flex flex-col justify-center">
                        {book.premium && (

                            <div className="absolute top-2 right-2   flex items-center tooltip cursor-pointer tooltip-warning" data-tip="Premium">
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
                                <span>{book.viewCount} views</span>
                            </div>
                            <div className="flex items-center">
                                <BsStarFill className="h-5 w-5 mr-1 text-yellow-400" />
                                <span>{book.rating} </span>
                            </div>
                        </div>

                        {/* Detail Button */}
                        <button
                            className="mt-4 w-full bg-secondary text-white py-2 px-4 rounded-none hover:bg-blue-600 transition duration-300 text-center"
                        // onClick={() => handleDetails(book.id)}
                        >
                            Read Now
                        </button>
                    </div>
                </div>


            ))
            }
        </div >
    );
};

export default BookSection;
