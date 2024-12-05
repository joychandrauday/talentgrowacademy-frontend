import React from 'react';

const Profile = () => {
    const user = {
        name: "John Doe",
        userID: "334255",
        email: "john.doe@example.com",
        phone: "1234567890",
        whatsapp: "1234567890",
        status: "active",
        role: "user",
        referrence: "443422",
        balance: 150,
        groupLeader: "225633",
        consultant: "775899",
        seniorGroupLeader: "665699",
        trainer: "223344",
        createdAt: "2024-11-30T12:00:00.000Z"
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full   rounded-xl shadow-lg p-8 text-white">
                <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>

                <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-green-400 to-blue-600 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{user.name.charAt(0)}</span>
                    </div>
                </div>

                <div className="flex flex-col space-y-6">
                    {[
                        { label: "Name", value: user.name },
                        { label: "User ID", value: user.userID },
                        { label: "Email", value: user.email },
                        { label: "Phone", value: user.phone },
                        { label: "WhatsApp", value: user.whatsapp },
                        { label: "Role", value: user.role },
                        { label: "Reference", value: user.referrence },
                        { label: "Balance", value: `৳${user.balance}` },
                        { label: "Group Leader", value: user.groupLeader },
                        { label: "Consultant", value: user.consultant },
                        { label: "Senior Group Leader", value: user.seniorGroupLeader },
                        { label: "Trainer", value: user.trainer },
                        {
                            label: "Status",
                            value: (
                                <span className={`font-semibold ${user.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                                    {user.status}
                                </span>
                            )
                        },
                        {
                            label: "Created At",
                            value: new Date(user.createdAt).toLocaleString()
                        }
                    ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-sm hover:bg-gray-600 transition">
                            <p className="text-sm text-gray-400">{item.label}</p>
                            <p className="text-lg font-medium">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
