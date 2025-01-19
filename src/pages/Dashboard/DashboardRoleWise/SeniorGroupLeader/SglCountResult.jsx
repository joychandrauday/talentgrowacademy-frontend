import React, { useState } from 'react';
import useGL from '../../../../Hooks/roleFetch/useGL';
import useUser from '../../../Others/Register/useUser';
import { ScrollRestoration } from 'react-router-dom';
import Count from '../../../../components/Shared/Count';

const SglCountResult = () => {
    const { groupLeaders } = useGL() || { groupLeaders: [] };
    const { userdb } = useUser();
    // filter group leader based on sgl
    const sglGroupLeaders = groupLeaders.filter((groupLeader) => groupLeader?.seniorGroupLeader?._id === userdb._id);
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
                    {sglGroupLeaders.map((count) => (
                        <option key={count._id} value={count._id}>
                            {count.name}
                        </option>
                    ))}
                </select>
            </div>

            {
                selectCountUserId &&
                // Passing selected values to Count component
                < Count countId={selectCountUserId} countRole='group-leader' />
            }
            <ScrollRestoration />
        </div>
    );
}

export default SglCountResult;
