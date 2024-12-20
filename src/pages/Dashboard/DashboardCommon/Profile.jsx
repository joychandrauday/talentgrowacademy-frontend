import { FaUserTag, FaCircle, FaUserTie, FaUsers, FaChessQueen, FaChalkboardTeacher, FaLink, FaPhoneAlt, FaWhatsapp, FaCalendarCheck, FaClock, FaAddressCard } from 'react-icons/fa';
import useUser from '../../Others/Register/useUser';
import { useState } from 'react';
import { GiWorld } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
const Profile = () => {

  const { userdb } = useUser()
  console.log(userdb);
  console.log(userdb.seniorGroupLeader?.name);
  const [copied, setCopied] = useState(false);


  // add a image upload fuctionaluty using cloudinary by clicking on avatar 



  const handleCopy = (userID) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_API_URL}/register?refer=${userID}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };
  return (
    <div className="p-6 pt-0">

      <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Avatar, Name, Email, and Balance */}

        <div className="">
          {/* User Profile Picture */}
          <img
            src={userdb.avatar || 'https://placehold.co/800@3x.png'}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold">{userdb.name}</h2>

            <p className="text-sm text-gray-600">
              <strong>Balance:</strong> ৳{userdb.balance}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Role:</strong> {userdb.role}
            </p>
          </div>
        </div>


        {/* Right Column: Rest of the user details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Details</h3>
          <div className="space-y-2">

            <p className="flex gap-2 items-center">
              <FaCircle className={`mr-2 ${userdb.status === 'active' ? 'text-green-500' : 'text-red-500 animate-pulse'} `} />
              <strong>Status:</strong> {userdb.status}
            </p>
            <p className="flex gap-2 items-center">
              <MdEmail className={`mr-2 ${userdb.status === 'active' ? 'text-green-500' : 'text-red-500 animate-pulse'} `} />
              <strong>Email:</strong> {userdb.email}
            </p>
            <p className="flex gap-2 items-center">
              <FaPhoneAlt className="text-green-600 mr-2" />
              <strong>Phone:</strong> {userdb.phone}
            </p>
            <p className="flex gap-2 items-center">
              <FaAddressCard className="text-green-600 mr-2" />
              <strong>UserID:</strong> {userdb.userID}
            </p>
            <p className="flex gap-2 items-center">
              <FaWhatsapp className="text-green-500 mr-2" />
              <strong>WhatsApp:</strong> {userdb.whatsapp}
            </p>

            <p className="flex gap-2 items-center">
              <GiWorld className="text-green-500 mr-2" />
              <strong>Country:</strong> {userdb.country}
            </p>

            <p className="flex gap-2 items-center">
              <FaLink className="text-gray-500 mr-2" />
              <strong>Reference:</strong> {userdb.reference?.userID}
            </p>
            <p className="flex gap-2 items-center">
              <FaUsers className="text-yellow-500 mr-2" />
              <strong>Group Leader:</strong> {userdb.groupLeader?.userID}
            </p>
            <p className="flex gap-2 items-center">
              <FaChalkboardTeacher className="text-indigo-500 mr-2" />
              <strong>Trainer:</strong> {userdb.trainer?.userID}
            </p>
            <p className="flex gap-2 items-center">
              <FaCalendarCheck className="text-blue-400 mr-2" />
              <strong>Joined:</strong> {new Date(userdb.createdAt).toLocaleDateString()}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              {userdb.status === 'active' ? (
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-600">Refer Link:</span>
                  <span className="text-blue-500 hover:underline cursor-pointer">

                  </span>
                  <button
                    className={`text-secondary btn btn-sm bg-primary hover:text-green-500 transition ${copied ? 'text-green-500' : ''
                      }`}
                    onClick={() => handleCopy(userdb.userID)}
                    title={copied ? 'Copied!' : 'Copy Refer link'}
                  >Refer Link
                    {copied ? '✔' : '📋'}
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
