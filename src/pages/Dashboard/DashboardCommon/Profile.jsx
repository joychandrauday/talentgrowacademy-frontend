import React from "react";

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
    createdAt: "2024-11-30T12:00:00.000Z",
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 md:p-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-green-400 to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
            {user.name.charAt(0)}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.phone}</p>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "User ID", value: user.userID },
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
                <span
                  className={`font-semibold ${
                    user.status === "active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.status}
                </span>
              ),
            },
            {
              label: "Created At",
              value: new Date(user.createdAt).toLocaleString(),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-[#2B6777] p-6 rounded-lg shadow-lg border border-[#2B6777] hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <p className="text-sm text-white">{item.label}</p>
              <p className="text-lg font-semibold text-[#F2A154]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
