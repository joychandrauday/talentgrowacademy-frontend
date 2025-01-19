import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Count from './Count';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useGL from '../../Hooks/roleFetch/useGL';
import useSGL from '../../Hooks/roleFetch/useSGL';
import useSGLManager from '../../Hooks/roleFetch/useSGLManager';
import useTeacherManager from '../../Hooks/roleFetch/useTeacherManager';
import useConsManager from '../../Hooks/roleFetch/useConsManager';
import useUser from '../../pages/Others/Register/useUser';
import { ScrollRestoration } from 'react-router-dom';


const CountResult = () => {
    const axiosPublic = useAxiosPublic();

    const { groupLeaders } = useGL() || { groupLeaders: [] };
    const { seniorGroupLeaders } = useSGL() || { seniorGroupLeaders: [] };
    const { seniorGroupLeaderManagers } = useSGLManager() || { seniorGroupLeaderManagers: [] };
    const { teacherManagers } = useTeacherManager() || { teacherManagers: [] };
    const { consultantManagers } = useConsManager() || { consultantManagers: [] };
    const { userdb } = useUser();
    const [countUsersFor, setCountUsersFor] = useState([])
    const [selectCountUserId, setSelectCountUserId] = useState('')
    const [selectedRole, setSelectedRole] = useState('');
    // Set additional role options based on the selected role
    useEffect(() => {
        if (userdb.role === 'consultant') {
            setSelectedRole('sgl');
        } else if (userdb.role === 'sgl') {
            setSelectedRole('group-leader');
        } else if (userdb.role === 'group-leader') {
            setSelectedRole('trainer');
        } else if (userdb.role === 'consultant-manager') {
            setSelectedRole('consultant');
        }
    }, [consultantManagers, groupLeaders, selectedRole, seniorGroupLeaderManagers, seniorGroupLeaders, teacherManagers, userdb.role]);

    useEffect(() => {
        let dynamicField = userdb.role;

        if (userdb.role === 'group-leader') {
            dynamicField = 'groupLeader';
        } else if (userdb.role === 'manager-teacher') {
            dynamicField = 'teacherManager';
        } else if (userdb.role === 'sgl') {
            dynamicField = 'seniorGroupLeader';
        } else if (userdb.role === 'sgl-manager') {
            dynamicField = 'seniorGroupLeaderManager';
        } else if (userdb.role === 'consultant-managers') {
            dynamicField = 'consultantManager';
        } else if (userdb.role === 'teacher-manager') {
            dynamicField = 'teacherManager';
        } else if (userdb.role === 'consultant') {
            setCountUsersFor(seniorGroupLeaders);
            return; // Exit early if user role is "consultant"
        }


        const fetchData = async () => {
            try {
                const { data } = await axiosPublic.get(`/admins/alladmins`, {
                    params: { role: selectedRole, [dynamicField]: userdb._id },
                });

                setCountUsersFor(data.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the async function
    }, [userdb, selectedRole, seniorGroupLeaders]);

    console.log(groupLeaders);
    return (
        <div className="p-4">
            {/* Dropdown for Trainer ID */}
            <div className="mb-4">
                <label htmlFor="trainerSelect" className="block font-semibold mb-2">Select {selectedRole}</label>
                <select
                    id="trainerSelect"
                    value={selectCountUserId}
                    onChange={(e) => setSelectCountUserId(e.target.value)}
                    className="p-2 border rounded w-full"
                >
                    <option selected>
                        select {selectedRole}
                    </option>
                    {countUsersFor.map((count) => (
                        <option key={count._id} value={count._id}>
                            {count.name}
                        </option>
                    ))}
                </select>
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

CountResult.propTypes = {};

export default CountResult;
