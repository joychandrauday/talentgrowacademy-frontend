import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { BsStars } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

const AdminAllBookManagement = () => {
    const axiosPublic = useAxiosPublic();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editBook, setEditBook] = useState(null);

    // Fetch books using TanStack Query
    const { data: books = [], isLoading, refetch } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const response = await axiosPublic.get("/books");
            return response.data;
        },
    });

    // Form handling with React Hook Form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Add book handler
    const onSubmit = async (data) => {
        try {
            if (editBook) {
                // Update existing book
                await axiosPublic.put(`/books/${editBook._id}`, data);
                Swal.fire("Success!", "The book has been updated.", "success");
            } else {
                // Add new book
                await axiosPublic.post("/books", data);
                Swal.fire("Success!", "The book has been added.", "success");
            }
            refetch(); // Refetch books after action
            reset();
            setShowAddForm(false);
            setEditBook(null);
        } catch (error) {
            Swal.fire("Error!", error.response?.data?.message || "An error occurred.", "error");
        }
    };

    // Delete book handler
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await axiosPublic.delete(`/books/${id}`);
                refetch(); // Refetch books after deletion
                Swal.fire("Deleted!", "The book has been deleted.", "success");
            } catch (error) {
                Swal.fire("Error!", error.response?.data?.message || "An error occurred.", "error");
            }
        }
    };

    // Edit book handler
    const handleEdit = (book) => {
        setEditBook(book);
        setShowAddForm(true);
    };

    // Loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin All Books Management</h1>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
                onClick={() => {
                    setShowAddForm(!showAddForm);
                    setEditBook(null); // Reset editBook when opening add form
                }}
            >
                {showAddForm ? "Cancel" : "Add New Book"}
            </button>

            {showAddForm && (
                <form
                    className="mb-6 bg-gray-100 p-4 rounded shadow-md"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full border px-3 py-2 rounded"
                            {...register("title", { required: "Title is required" })}
                            defaultValue={editBook?.title || ""}
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Description</label>
                        <textarea
                            className="w-full border px-3 py-2 rounded"
                            {...register("description")}
                            defaultValue={editBook?.description || ""}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">File URL</label>
                        <input
                            type="url"
                            className="w-full border px-3 py-2 rounded"
                            {...register("fileUrl", { required: "File URL is required" })}
                            defaultValue={editBook?.fileUrl || ""}
                        />
                        {errors.fileUrl && <p className="text-red-500">{errors.fileUrl.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Author</label>
                        <input
                            type="text"
                            className="w-full border px-3 py-2 rounded"
                            {...register("author")}
                            defaultValue={editBook?.author || ""}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Book Image URL</label>
                        <input
                            type="url"
                            className="w-full border px-3 py-2 rounded"
                            {...register("bookImage")}
                            defaultValue={editBook?.bookImage || ""}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Premium</label>
                        <select
                            className="w-full border px-3 py-2 rounded"
                            {...register("premium")}
                            defaultValue={editBook?.premium || false}
                        >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Public</label>
                        <select
                            className="w-full border px-3 py-2 rounded"
                            {...register("isPublic")}
                            defaultValue={editBook?.isPublic || true}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {editBook ? "Update Book" : "Add Book"}
                    </button>
                </form>
            )}

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Image</th>
                        <th className="px-6 py-3 text-left">Title</th>
                        <th className="px-6 py-3 text-left">Author</th>
                        <th className="px-6 py-3 text-left">Link</th>
                        <th className="px-6 py-3 text-left">Premium</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books?.map((book) => (
                        <tr key={book._id} className="border-b">
                            <td className="px-6 py-4">
                                {book.bookImage ? <img src={book.bookImage} className="w-24" alt="" /> : "N/A"}
                            </td>
                            <td className="px-6 py-4">{book.title}</td>
                            <td className="px-6 py-4">{book.author || "Unknown"}</td>
                            <td className="px-6 py-4">{
                                book.fileUrl ? <a href={book.fileUrl} className="link link-primary" target="_blank" rel="noopener noreferrer">View</a> : 'N/A'
                            }</td>
                            <td className="px-6 py-4">{book.premium ? <span className="badge badge-warning"> premium <BsStars /></span> : "No"}</td>
                            <td className="px-6 flex items-center justify-between gap-4 py-4 ">
                                <FaEdit
                                    className="cursor-pointer text-primary text-xl"
                                    onClick={() => handleEdit(book)}
                                />
                                <FaTrash
                                    className="cursor-pointer text-red-600 text-xl"
                                    onClick={() => handleDelete(book._id)}

                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAllBookManagement;
