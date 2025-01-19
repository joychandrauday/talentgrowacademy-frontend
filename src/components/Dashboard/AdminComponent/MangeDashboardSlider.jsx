import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const ManageDashboardSlider = () => {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();

    const { data: sliders, isLoading, error } = useQuery({
        queryKey: ['homeSliders'],
        queryFn: async () => {
            const response = await axiosPublic.get('/home-slider?type=dashboard');
            return response.data;
        },
    });

    const [newSlider, setNewSlider] = useState({
        title: '',
        description: '',
        imageFile: null,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingSliderId, setEditingSliderId] = useState(null);

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Profile_pic'); // Replace with your actual upload preset
        const response = await fetch('https://api.cloudinary.com/v1_1/dab8rppoj/image/upload', { // Replace with your actual cloud name
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.secure_url;
    };

    const handleAddSlider = async () => {
        try {
            const imageUrl = newSlider.imageFile
                ? await uploadImageToCloudinary(newSlider.imageFile)
                : null;

            await axiosPublic.post('/home-slider', {
                title: newSlider.title || null,
                description: newSlider.description || null,
                imageUrl,
                type: 'dashboard',
            });
            queryClient.invalidateQueries(['homeSliders']);
            setNewSlider({ title: '', description: '', imageFile: null });
            toast.success('Slide Added Successfully.');
        } catch (error) {
            console.error('Error adding slider:', error);
        }
    };

    const handleEditSlider = async () => {
        try {
            const imageUrl = newSlider.imageFile
                ? await uploadImageToCloudinary(newSlider.imageFile)
                : newSlider.imageUrl;

            await axiosPublic.put(`/home-slider/${editingSliderId}`, {
                title: newSlider.title,
                description: newSlider.description,
                imageUrl,
            });
            queryClient.invalidateQueries(['homeSliders']);
            setIsEditing(false);
            setNewSlider({ title: '', description: '', imageFile: null });
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
            imageFile: null,
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
            <h1 className="text-3xl font-bold text-center mb-6">Manage Dashboard Banner</h1>

            <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
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
                            <span className="label-text">Image File</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-primary w-full"
                            onChange={(e) => setNewSlider({ ...newSlider, imageFile: e.target.files[0] })}
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

export default ManageDashboardSlider;
