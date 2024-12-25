import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useCard from '../../../Hooks/roleFetch/useCard';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageCards = () => {
    const queryClient = useQueryClient();
    const { cards, refetch } = useCard();
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, reset, setValue } = useForm();
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle create or update card
    const onSubmit = async (data) => {
        try {
            if (selectedCard) {
                // Update existing card
                await axiosPublic.patch(`/cards/${selectedCard._id}`, data);

            } else {
                // Create a new card
                await axiosPublic.post('/cards', data);


            }
            refetch()
            // Invalidate query to refresh the list of cards
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            reset(); // Reset form after submit
            setSelectedCard(null); // Reset selected card
            setIsModalOpen(false); // Close modal
        } catch (error) {
            console.error('Error while submitting:', error);
        }
    };

    // Handle editing a card
    const editCard = (card) => {
        setSelectedCard(card);
        setValue('title', card.title);
        setValue('ID', card.ID);
        setValue('subtitle', card.subtitle);
        setValue('text', card.text);
        setValue('description', card.description);
        setValue('link1', card.link1);
        setValue('link2', card.link2);
        setValue('linkHeading1', card.linkHeading1);
        setValue('linkHeading2', card.linkHeading2);
        setValue('imageUrl', card.imageUrl);
        setValue('cardGroup', card.cardGroup);
        setIsModalOpen(true); // Open modal for editing
    };

    // Handle deleting a card
    // const handleDelete = async (id) => {
    //     try {
    //         // add swal
    //         const { value: confirmDelete } = await Swal.fire({
    //             title: 'Are you sure you want to delete this card?',
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonText: 'Yes, delete it!',
    //             cancelButtonText: 'No, keep it',
    //         });

    //         if (confirmDelete) {
    //             await axiosPublic.delete(`/cards/${id}`);
    //             refetch(); // Invalidate query to refresh the list of cards
    //             Swal.fire('Deleted!', 'The card has been deleted.', 'success');
    //         }


    //     } catch (error) {
    //         console.error('Error while deleting card:', error);
    //     }
    // };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Cards</h2>

            <button
                onClick={() => {
                    reset();
                    setSelectedCard(null);
                    setIsModalOpen(true);
                }}
                className="btn btn-primary mb-4"
            >
                Create New Card
            </button>

            {/* Modal for form */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                            ✕
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <input
                                {...register('title')}
                                placeholder="Title"
                                className="input input-bordered w-full"
                                required
                            />
                            <input
                                {...register('subtitle')}
                                placeholder="Subtitle"
                                className="input input-bordered w-full"
                            />
                            <input
                                {...register('ID')}
                                placeholder="ID"
                                className="input input-bordered w-full"
                                readOnly={selectedCard}

                            />
                            <textarea
                                {...register('text')}
                                placeholder="Text"
                                className="textarea textarea-bordered w-full"
                            />
                            <textarea
                                {...register('description')}
                                placeholder="Description"
                                className="textarea textarea-bordered w-full"
                            />
                            <input
                                {...register('link1')}
                                placeholder="Link 1"
                                className="input input-bordered w-full"
                            />
                            <input
                                {...register('link2')}
                                placeholder="Link 2"
                                className="input input-bordered w-full"
                            />
                            <input
                                {...register('linkHeading1')}
                                placeholder="Link Heading 1"
                                className="input input-bordered w-full"
                            />
                            <input
                                {...register('linkHeading2')}
                                placeholder="Link Heading 2"
                                className="input input-bordered w-full"
                            />
                            <input
                                {...register('imageUrl')}
                                placeholder="Image URL"
                                className="input input-bordered w-full"
                            />
                            <select
                                {...register('cardGroup')}
                                className="select select-bordered w-full"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Select Card Group
                                </option>
                                <option value="link">Link</option>
                                <option value="notice">Notice</option>
                                <option value="others">Others</option>
                            </select>

                            <button type="submit" className="btn btn-success w-full">
                                {selectedCard ? 'Update Card' : 'Create Card'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Display cards */}
            {cards?.length === 0 ? (
                <p className="text-center text-lg text-gray-500">No cards found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {cards.map((card) => (
                        <div key={card._id} className="card shadow-lg">
                            <div className="card-body relative">
                                <h3 className="card-title">{card.title}</h3>
                                <p>{card.description}</p>
                                {/* add Link1 */}
                                <div className="text-primary hover:text-primary-dark">
                                    Link 1: {card.link1}
                                </div>

                                <div className="card-actions justify-end">
                                    <button
                                        onClick={() => editCard(card)}
                                        className="btn "
                                    >
                                        <FaEdit />
                                    </button>
                                    {/* <button
                                        onClick={() => handleDelete(card._id)}
                                        className="btn "
                                    >
                                        <FaTrash />
                                    </button> */}
                                </div>
                                <div className="absolute top-2 right-2 badge badge-warning">
                                    #{card.ID}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
};

export default ManageCards;
