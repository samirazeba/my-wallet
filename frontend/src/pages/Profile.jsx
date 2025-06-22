import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";


const Profile = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <ProfileHeader />
            </div>
        </div>
    );
};

export default Profile;