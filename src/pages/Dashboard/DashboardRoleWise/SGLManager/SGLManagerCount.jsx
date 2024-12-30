import React, { useEffect, useState } from 'react';
import Count from '../../../../components/Shared/Count';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useUser from '../../../Others/Register/useUser';
import { ScrollRestoration } from 'react-router-dom';
import useTrainers from '../../../../Hooks/roleFetch/useTrainers';
import useGL from '../../../../Hooks/roleFetch/useGL';
import useSGL from '../../../../Hooks/roleFetch/useSGL';

const SGLManagerCount = () => {
    const { userdb } = useUser();
    const axiosPublic = useAxiosPublic();

    const [countUsersFor, setCountUsersFor] = useState([])
    const [selectCountUserId, setSelectCountUserId] = useState('')
    const [selectedRole, setSelectedRole] = useState('');
    const { trainers } = useTrainers()
    const { groupLeaders } = useGL()
    const { seniorGroupLeaders } = useSGL()
    const getOptions = () => {
        // Check the selected role and return the corresponding list of users
        switch (selectedRole) {
            case 'trainer':
                return trainers;
            case 'group-leader':
                return groupLeaders;
            case 'sgl':
                return seniorGroupLeaders;
            default:
                return [];
        }
    };
    return (
        <div className="p-4">
            {/* Dropdown for Trainer ID */}
            <div className="grid grid-cols-3">
                <div className="mb-4">
                    <label htmlFor="roleSelect" className="block font-semibold mb-2">
                        Select Role
                    </label>
                    <select
                        id="roleSelect"
                        value={selectedRole}
                        onChange={(e) => {
                            setSelectedRole(e.target.value);
                            setSelectCountUserId(''); // Reset the selected ID when role changes
                        }}
                        className="p-2 border rounded w-full"
                    >
                        <option value="">-- Select Role --</option>
                        <option value="trainer">Trainer</option>
                        <option value="group-leader">Group Leader</option>
                        <option value="sgl">Senior Group Leader</option>
                    </select>
                </div>

                {/* Dropdown for User Selection */}
                {selectedRole && (
                    <div className="mb-4">
                        <label htmlFor="userSelect" className="block font-semibold mb-2">
                            Select {selectedRole}
                        </label>
                        <select
                            id="userSelect"
                            value={selectCountUserId}
                            onChange={(e) => setSelectCountUserId(e.target.value)}
                            className="p-2 border rounded w-full"
                        >
                            <option value="">-- Select {selectedRole} --</option>
                            {getOptions().map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

            </div>

            {
                selectCountUserId &&
                // Passing selected values to Count component
                < Count countId={selectCountUserId} countRole={selectedRole} />
            }
            <ScrollRestoration />
        </div>
    );
};

export default SGLManagerCount;
