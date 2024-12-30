import React, { useEffect, useState } from 'react';
import Count from '../../../../components/Shared/Count';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useUser from '../../../Others/Register/useUser';
import { ScrollRestoration } from 'react-router-dom';
import useTrainers from '../../../../Hooks/roleFetch/useTrainers';
import useGL from '../../../../Hooks/roleFetch/useGL';
import useSGL from '../../../../Hooks/roleFetch/useSGL';
import useConsultant from '../../../../Hooks/roleFetch/useConsultant';

const ConsultantManagerCount = () => {
    const { userdb } = useUser();
    const axiosPublic = useAxiosPublic();

    const [countUsersFor, setCountUsersFor] = useState([])
    const [selectCountUserId, setSelectCountUserId] = useState('')
    const [selectedRole, setSelectedRole] = useState('consultant');
    const { consultants } = useConsultant()

    return (
        <div className="p-4">
            {/* Dropdown for Trainer ID */}
            <div className="grid grid-cols-3">

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
                        {consultants.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

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

export default ConsultantManagerCount;
