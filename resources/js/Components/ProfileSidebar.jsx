import React from 'react';

const ProfileSidebar = ({ user }) => {
    return (
        <div className="w-full lg:w-1/4 p-4 bg-white shadow-lg rounded-lg">
            <div className="text-center">
                <img
                    src={user.profilePicture || '/default-profile.png'}
                    alt="Profile"
                    className="rounded-full w-24 h-24 mx-auto"
                />
                <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.role}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Edit Profile</button>
            </div>
        </div>
    );
};

export default ProfileSidebar;
