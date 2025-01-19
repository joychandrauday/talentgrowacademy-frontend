import React, { useState } from 'react';
import useUser from '../../../Others/Register/useUser';
import { ScrollRestoration } from 'react-router-dom';
import Count from '../../../../components/Shared/Count';
import useTrainers from '../../../../Hooks/roleFetch/useTrainers';

const GlCountResult = () => {
    const { trainers } = useTrainers() || { groupLeaders: [] };
    const { userdb } = useUser();
    // filter group leader based on sgl
    const glTrainer = trainers.filter((trainer) => trainer?.groupLeader?._id === userdb._id);
    // State to hold selected trainer ID
    const [selectCountUserId, setSelectCountUserId] = useState('')
    return (
        <div>
            {/* Dropdown for Trainer ID */}
            <div className="mb-4">
                <label htmlFor="trainerSelect" className="block font-semibold mb-2">Select Group Leader</label>
                <select
                    id="trainerSelect"
                    value={selectCountUserId}
                    onChange={(e) => setSelectCountUserId(e.target.value)}
                    className="p-2 border rounded w-full"
                >
                    <option selected>
                        select Group Leader
                    </option>
                    {glTrainer.map((count) => (
                        <option key={count._id} value={count._id}>
                            {count.name}
                        </option>
                    ))}
                </select>
            </div>

            {
                selectCountUserId &&
                // Passing selected values to Count component
                < Count countId={selectCountUserId} countRole='trainer' />
            }
            <ScrollRestoration />
        </div>
    );
}

export default GlCountResult;
