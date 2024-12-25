import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useForm } from 'react-hook-form';
import useCard from '../../../../Hooks/roleFetch/useCard';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { FaEdit } from 'react-icons/fa';

const TeacherManagerUtility = () => {
    const { cards, refetch } = useCard();
    const [selectedCard, setSelectedCard] = useState(null);
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleEditCard = (card) => {
        setSelectedCard(card);
        reset(card);
    };

    const handleSaveChanges = async (data) => {
        try {
            const response = await axiosPublic.patch(`/cards/${selectedCard._id}`, data);

            if (response.status === 200) {
                Swal.fire('Success', 'Card updated successfully', 'success');
                refetch();
                setSelectedCard(null);
            } else {
                Swal.fire('Error', 'Failed to update the card', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    return (
        <div className="p-6 bg-gray-50">
            <h1 className="text-2xl font-bold mb-6">Teacher Manager Utility</h1>

            <Tabs>
                <TabList>
                    <Tab>Manage Cards</Tab>
                    <Tab>Other Utility</Tab>
                </TabList>

                {/* Manage Cards Tab */}
                <TabPanel>
                    <h2 className="text-xl font-bold ">Manage Cards</h2>
                    {cards && cards.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                            {cards.map((card) => (
                                <div key={card._id} className="p-4 relative bg-white rounded shadow card">
                                    <div className="card-body">
                                        <h3 className="text-lg font-bold card-title">{card.title}</h3>
                                        <p>{card.link1 ? card.link1 : 'none.'}</p>
                                    </div>
                                    <button
                                        className="btn bg-transparent"
                                        onClick={() => handleEditCard(card)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <span className="badge badge-warning absolute top-2 font-bold right-2">{card.cardGroup}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No cards available.</p>
                    )}

                </TabPanel>

                {/* Other Utility Tab */}
                <TabPanel>
                    <h2 className="text-xl font-bold">Other Utility</h2>
                    <p>This is content for the "Other Utility" tab. Add more functionality as needed.</p>
                </TabPanel>
            </Tabs>

            {/* Edit Modal */}
            {selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6 w-full max-w-2xl">
                        <h2 className="text-xl font-bold ">Edit Card</h2>
                        <form onSubmit={handleSubmit(handleSaveChanges)}>
                            {/* Title Field */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        {...register('title', { required: 'Title is required' })}
                                        className="w-full p-2 border rounded"
                                    />
                                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                                </div>

                                {/* Subtitle Field */}
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                                    <input
                                        type="text"
                                        {...register('subtitle')}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>



                                {/* Text Field */}
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Text</label>
                                    <textarea
                                        {...register('text')}
                                        placeholder="Text"
                                        className="textarea textarea-bordered w-full"
                                    />
                                </div>

                                {/* Description Field */}
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        {...register('description')}
                                        className="w-full p-2 border rounded"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                                </div>

                                {/* Link Fields */}
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Link 1</label>
                                    <input
                                        type="text"
                                        {...register('link1')}
                                        placeholder="Link 1"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Link 2</label>
                                    <input
                                        type="text"
                                        {...register('link2')}
                                        placeholder="Link 2"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Link Heading Fields */}
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Link Heading 1</label>
                                    <input
                                        type="text"
                                        {...register('linkHeading1')}
                                        placeholder="Link Heading 1"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Link Heading 2</label>
                                    <input
                                        type="text"
                                        {...register('linkHeading2')}
                                        placeholder="Link Heading 2"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Image URL Field */}
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                    <input
                                        type="text"
                                        {...register('imageUrl')}
                                        className="input input-bordered w-full"
                                    />
                                    {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
                                </div>

                                {/* Card Group Field */}
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">Card Group</label>
                                    <select
                                        {...register('cardGroup', { required: 'Card Group is required' })}
                                        className="select select-bordered w-full"
                                    >
                                        <option value="">Select Card Group</option>
                                        <option value="link">Link</option>
                                        <option value="notice">Notice</option>
                                        <option value="others">Others</option>
                                    </select>
                                    {errors.cardGroup && <p className="text-red-500 text-sm">{errors.cardGroup.message}</p>}
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-secondary bg-secondary"
                                        onClick={() => setSelectedCard(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary bg-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            )
            }
        </div >
    );
};

export default TeacherManagerUtility;
