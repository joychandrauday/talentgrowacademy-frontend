import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const ManageHomeSlider = () => {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();

    const { data: sliders, isLoading, error } = useQuery({
        queryKey: ['homeSliders'],
        queryFn: async () => {
            const response = await axiosPublic.get('/home-slider?type=home');
            return response.data;
        },
    });

    const [newSlider, setNewSlider] = useState({
        title: '',
        description: '',
        imageUrl: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingSliderId, setEditingSliderId] = useState(null);
    const [imageFile, setImageFile] = useState(null); // To store selected image file

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Profile_pic');
        formData.append('cloud_name', 'dab8rppoj');

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dab8rppoj/image/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data.url; // Return the uploaded image URL
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Image upload failed.');
            throw error;
        }
    };

    const handleAddSlider = async () => {
        try {
            const imageUrl = imageFile ? await uploadImageToCloudinary(imageFile) : '';

            await axiosPublic.post('/home-slider', {
                title: newSlider.title,
                description: newSlider.description,
                imageUrl,
                type: 'home',
            });
            queryClient.invalidateQueries(['homeSliders']);
            setNewSlider({
                title: '',
                description: '',
                imageUrl: '',
            });
            setImageFile(null);
            toast.success('Slide Added Successfully.');
        } catch (error) {
            console.error('Error adding slider:', error);
        }
    };

    const handleEditSlider = async () => {
        try {
            const imageUrl = imageFile ? await uploadImageToCloudinary(imageFile) : newSlider.imageUrl;

            const updatedSlider = {
                ...newSlider,
                imageUrl,
            };
            await axiosPublic.put(`/home-slider/${editingSliderId}`, updatedSlider);
            queryClient.invalidateQueries(['homeSliders']);
            setIsEditing(false);
            setNewSlider({
                title: '',
                description: '',
                imageUrl: '',
            });
            setImageFile(null);
            toast.success('Slide Updated Successfully.');
        } catch (error) {
            console.error('Error editing slider:', error);
        }
    };

    const handleDeleteSlider = async (sliderId) => {
        try {
            await axiosPublic.delete(`/home-slider/${sliderId}`);
            queryClient.invalidateQueries(['homeSliders']);
            toast.success('Slide Deleted Successfully.');
        } catch (error) {
            console.error('Error deleting slider:', error);
            toast.error('Slide Deletion Failed.');
        }
    };

    const startEditing = (slider) => {
        window.scrollTo(0, 0);
        setNewSlider({
            title: slider.title,
            description: slider.description,
            imageUrl: slider.imageUrl,
        });
        setIsEditing(true);
        setEditingSliderId(slider._id);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching sliders: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-base-200 rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Manage Home Banner</h1>

            <div className=" mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Slider' : 'Add New Slider'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter title"
                            className="input input-bordered input-primary w-full"
                            value={newSlider.title}
                            onChange={(e) => setNewSlider({ ...newSlider, title: e.target.value })}
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            placeholder="Enter description"
                            className="textarea textarea-bordered textarea-primary w-full"
                            value={newSlider.description}
                            onChange={(e) => setNewSlider({ ...newSlider, description: e.target.value })}
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered file-input-primary w-full"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </div>

                    <button
                        onClick={isEditing ? handleEditSlider : handleAddSlider}
                        className="btn btn-primary w-full"
                    >
                        {isEditing ? 'Update Slider' : 'Add Slider'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {sliders.map((slider) => (
                    <div key={slider._id} className="card w-full bg-base-100 shadow-xl">
                        <figure>
                            <img src={slider.imageUrl} alt={slider.title} className="w-full h-48 object-cover rounded-t-lg" />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title">{slider.title}</h3>
                            <p>{slider.description?.slice(0, 70)}...</p>

                            <div className="card-actions justify-end">
                                <button
                                    onClick={() => startEditing(slider)}
                                    className="btn btn-secondary"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteSlider(slider._id)}
                                    className="btn btn-error"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageHomeSlider;
