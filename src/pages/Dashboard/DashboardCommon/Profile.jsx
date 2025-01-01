import { FaUserTag, FaCircle, FaUserTie, FaUsers, FaChessQueen, FaChalkboardTeacher, FaLink, FaPhoneAlt, FaWhatsapp, FaCalendarCheck, FaClock, FaAddressCard } from 'react-icons/fa';
import { MdAddAPhoto } from "react-icons/md";
import { GiWorld } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import { useState } from 'react';
import useUser from '../../Others/Register/useUser';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Profile = () => {
  const { userdb } = useUser();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const axiosPublic = useAxiosPublic();

  const handleCopy = (userID) => {
    const currentUrl = `${window.location.origin}/register?refer=${userID}`;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true); // Start loader

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Profile_pic'); // Your Cloudinary upload preset
    formData.append('cloud_name', 'dab8rppoj'); // Your Cloudinary cloud name

    try {
      // Upload to Cloudinary
      const uploadResponse = await axiosPublic.post(
        `https://api.cloudinary.com/v1_1/dab8rppoj/image/upload`,
        formData
      );

      const newAvatar = uploadResponse.data.secure_url;

      // Save the new avatar to the database
      await axiosPublic.post(`/users/change-profile/${userdb.userID}`, {
        newAvatar,
      });

      // Success alert
      Swal.fire({
        icon: 'success',
        title: 'Profile picture updated successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      // Update the local user data (optional, depends on your state management)
      // userdb.avatar = newAvatar; (if your state management allows direct updates)
    } catch (error) {
      // Error alert
      Swal.fire({
        icon: 'error',
        title: 'Failed to update profile picture!',
        text: error.response?.data?.message || 'Something went wrong.',
        showConfirmButton: true,
      });
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="p-6 pt-0">
      <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Avatar, Name, Email, and Balance */}
        <div className="relative">
          {/* User Profile Picture */}
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={userdb.avatar || 'https://placehold.co/800@3x.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            {/* Upload Button */}
            <label
              htmlFor="file-upload"
              className={`absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-green-500 transition ${loading ? 'pointer-events-none opacity-50' : ''}`}
            >
              {loading ? (
                <span className="loader"></span> // Spinner icon or CSS animation
              ) : (
                <MdAddAPhoto /> // Upload icon
              )}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                disabled={loading} // Disable while loading
              />
            </label>
          </div>

          <div className="text-center md:text-left mt-4">
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
              <FaCircle
                className={`mr-2 ${
                  userdb.status === 'active' ? 'text-green-500' : 'text-red-500 animate-pulse'
                }`}
              />
              <strong>Status:</strong> {userdb.status}
            </p>
            <p className="flex gap-2 items-center">
              <MdEmail
                className={`mr-2 ${
                  userdb.status === 'active' ? 'text-green-500' : 'text-red-500 animate-pulse'
                }`}
              />
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
            {userdb.isAdminstration !== true && (
              <>
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
              </>
            )}
            {userdb.role === 'trainer' && (
              <>
                <p className="flex gap-2 items-center">
                  <FaUsers className="text-yellow-500 mr-2" />
                  <strong>Group Leader:</strong> {userdb.groupLeader?.userID}
                </p>
              </>
            )}
            <p className="flex gap-2 items-center">
              <FaCalendarCheck className="text-blue-400 mr-2" />
              <strong>Joined:</strong> {new Date(userdb.createdAt).toLocaleDateString()}
            </p>
            {userdb.role === 'user' && (
              <div className="flex items-center space-x-2 mt-2">
                {userdb.status === 'active' ? (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600">Refer Link:</span>
                    <span className="text-blue-500 hover:underline cursor-pointer"></span>
                    <button
                      className={`text-secondary btn btn-sm bg-primary hover:text-green-500 transition ${
                        copied ? 'text-green-500' : ''
                      }`}
                      onClick={() => handleCopy(userdb.userID)}
                      title={copied ? 'Copied!' : 'Copy Refer link'}
                    >
                      Refer Link
                      {copied ? '✔' : '📋'}
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
