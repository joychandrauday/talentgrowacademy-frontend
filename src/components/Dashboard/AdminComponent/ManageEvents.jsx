import  { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const ManageEvents = () => {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient(); // This will help in refetching data

    // Fetching events using useQuery and axiosPublic
    const { data: events, isLoading, error } = useQuery({
        queryKey: ['events'],  // This is the query key
        queryFn: async () => {
            const response = await axiosPublic.get('/events');
            return response.data;
        },
    });

    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        banner: '',
        registerLink: '',
        date: ''
    });

    const [isEditing, setIsEditing] = useState(false); // Flag to track if we are editing an event
    const [editingSliderId, setEditingSliderId] = useState(null); // Store the ID of the event being edited
    const [showForm, setShowForm] = useState(false); // State to control form visibility
    const [imageFile, setImageFile] = useState(null); // To store selected image file


    //upload to cludinary

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


    // Handler to add a new event
    const handleAddEvent = async () => {
        const imageUrl =imageFile ? await uploadImageToCloudinary(imageFile) : '';
        console.log(imageUrl);
        try {
            await axiosPublic.post('/events', {
                title: newEvent.title ? newEvent.title : null,
                description: newEvent.description ? newEvent.description : null,
                imageUrl: imageUrl ? imageUrl : ' ',
                registerLink: newEvent.registerLink ? newEvent.registerLink : null,
                date: newEvent.date ? newEvent.date : null,
            });
            queryClient.invalidateQueries(['events']); // Refetch events after adding
            setNewEvent({
                title: '',
                description: '',
                imageUrl: '',
            });
            toast.success('Event Added Successfully.');
            setShowForm(false); // Hide the form after adding the event
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    // Handler to edit an existing event
    const handleEditEvent = async () => {
        try {
            const updatedEvent = {
                ...newEvent,
            };
            await axiosPublic.put(`/events/${editingSliderId}`, updatedEvent);
            queryClient.invalidateQueries(['events']); // Refetch events after editing
            setIsEditing(false); // Stop editing after success
            setNewEvent({
                title: '',
                description: '',
                banner: '',
                registerLink: ''
            });
            toast.success('Event Updated Successfully.');
            setShowForm(false); // Hide the form after editing the event
        } catch (error) {
            console.error('Error editing event:', error);
        }
    };

    // Handler to delete an event
    const handleDeleteEvent = async (eventId) => {
        try {
            await axiosPublic.delete(`/events/${eventId}`);
            queryClient.invalidateQueries(['events']); // Refetch events after deleting
            toast.success('Event Deleted Successfully.');
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Event Deletion Failed.');
        }
    };

    // Handler to populate the form with data from the event to edit
    const startEditing = (event) => {
        window.scrollTo(0, 0);
        setNewEvent({
            title: event.title,
            description: event.description,
            banner: event.banner,
            registerLink: event.registerLink,
            date: event.date
        });
        setIsEditing(true);
        setEditingSliderId(event._id);
        setShowForm(true); // Show the form when editing
    };

    // Toggle the form visibility when adding a new event
    const toggleForm = () => {
        setShowForm(!showForm);
        setIsEditing(false); // Reset editing flag
        setNewEvent({
            title: '',
            description: '',
            banner: '',
            registerLink: '',
            date: ''
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching events: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-base-200 rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Manage Upcoming Events</h1>

            {/* Button to show the form */}
            <button onClick={toggleForm} className="btn btn-primary mb-6">
                {showForm ? 'Cancel' : 'Add New Event'}
            </button>

            {/* Conditionally render the form */}
            {showForm && (
                <div className=" mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter title"
                                className="input input-bordered input-primary w-full"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                placeholder="Enter description"
                                className="textarea textarea-bordered textarea-primary w-full"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
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
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Register Link</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter register URL"
                                className="input input-bordered input-primary w-full"
                                value={newEvent.registerLink}
                                onChange={(e) => setNewEvent({ ...newEvent, registerLink: e.target.value })}
                                pattern="https?://.*" // regex pattern to match "http://" or "https://"
                                title="URL must start with http:// or https://"
                            />
                            {!/^https?:\/\//.test(newEvent.registerLink) && newEvent.registerLink && (
                                <p className="text-sm text-red-500 mt-1">Please enter a valid URL starting with http:// or https://</p>
                            )}
                        </div>


                        {/* Date Input Field */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Event Date</span>
                            </label>
                            <input
                                type="datetime-local"
                                className="input input-bordered input-primary w-full"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            />
                        </div>

                        <button
                            onClick={isEditing ? handleEditEvent : handleAddEvent}
                            className="btn btn-primary w-full"
                        >
                            {isEditing ? 'Update Event' : 'Add Event'}
                        </button>
                    </div>
                </div>
            )}

            {/* Displaying fetched events */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {events.map((event) => (
                    <div key={event._id} className="card w-full bg-base-100 shadow-xl">
                        <figure>
                            <img src={event.banner} alt={event.title} className="w-full h-48 object-cover rounded-t-lg" />
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title">{event.title}</h3>

                            {/* Event Date */}
                            <p className="text-sm text-gray-500 mb-2">
                                <strong>Date:</strong> <span className="badge badge-warning">{new Date(event.date).toLocaleDateString()}</span>
                                <span className="ml-2"><strong>Time:</strong><span className="badge badge-warning"> {new Date(event.date).toLocaleTimeString()}</span></span>
                            </p>

                            <p>{event.description?.slice(0, 70)}...</p>

                            <div className="card-actions justify-end">
                                <button
                                    onClick={() => startEditing(event)}
                                    className="btn btn-secondary"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteEvent(event._id)}
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

export default ManageEvents;
