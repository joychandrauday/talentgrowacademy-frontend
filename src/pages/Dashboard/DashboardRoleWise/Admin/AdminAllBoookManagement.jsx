import  { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminAllBookManagement = () => {
    const axiosPublic = useAxiosPublic();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editBook, setEditBook] = useState(null);
    const [loading, setLoading] = useState(false); // State to track loading status

    const { data: books = [], isLoading, refetch } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const response = await axiosPublic.get("/books");
            return response.data;
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const uploadToCloudinary = async (file, folder) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Profile_pic");
        formData.append("folder", folder);

        const response = await fetch("https://api.cloudinary.com/v1_1/dab8rppoj/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data.secure_url;
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true); // Set loading to true before uploading files

            let bookImage = editBook?.bookImage || "";
            if (data.bookImage?.[0]) {
                bookImage = await uploadToCloudinary(data.bookImage[0], "book-images");
            }

            let fileUrl = editBook?.fileUrl || "";
            if (data.file?.[0]) {
                fileUrl = await uploadToCloudinary(data.file[0], "book-files");
            }

            const payload = {
                ...data,
                bookImage,
                fileUrl,
            };

            if (editBook) {
                await axiosPublic.put(`/books/${editBook._id}`, payload);
                Swal.fire("Success!", "The book has been updated.", "success");
            } else {
                await axiosPublic.post("/books", payload);
                Swal.fire("Success!", "The book has been added.", "success");
            }

            refetch();
            reset();
            setShowAddForm(false);
            setEditBook(null);
        } catch (error) {
            Swal.fire("Error!", error.message || "An error occurred.", "error");
        } finally {
            setLoading(false); // Set loading to false after processing
        }
    };

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
                refetch();
                Swal.fire("Deleted!", "The book has been deleted.", "success");
            } catch (error) {
                Swal.fire("Error!", error.message || "An error occurred.", "error");
            }
        }
    };

    const handleEdit = (book) => {
        setEditBook(book);
        setShowAddForm(true);
    };

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
                    setEditBook(null);
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
                        <label className="block font-bold mb-2">Book Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border px-3 py-2 rounded"
                            {...register("bookImage")}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Book File (PDF)</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            className="w-full border px-3 py-2 rounded"
                            {...register("file")}
                        />
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
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="spinner-border animate-spin border-4 rounded-full w-6 h-6 border-t-transparent border-blue-500"></div>
                            </div>
                        ) : editBook ? (
                            "Update Book"
                        ) : (
                            "Add Book"
                        )}
                    </button>
                </form>
            )}

            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Image</th>
                        <th className="px-6 py-3 text-left">Title</th>
                        <th className="px-6 py-3 text-left">Author</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id} className="border-b">
                            <td className="px-6 py-4">
                                <img src={book.bookImage} alt={book.title} className="h-16 w-16 object-cover" />
                            </td>
                            <td className="px-6 py-4">{book.title}</td>
                            <td className="px-6 py-4">{book.author}</td>
                            <td className="px-6 py-4">
                                <button
                                    className="text-yellow-500 mr-4"
                                    onClick={() => handleEdit(book)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete(book._id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminAllBookManagement;
