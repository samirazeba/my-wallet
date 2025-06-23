import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import ProfileCard from "../components/ProfileCard";
import BankAccountsList from "../components/BankAccountList";
import useUserInfo from "../hooks/useUserInfo";


const Profile = () => {
    const user = useUserInfo();

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <ProfileHeader />
                <ProfileCard
                    name={user ? `${user.first_name} ${user.last_name}` : undefined}
                    email={user?.email}
                    phone={user?.phone_number}
                    // avatar={user?.avatar} // Uncomment if you add avatar support
                />
                <h2 className="text-lg font-semibold mt-8 mb-2 ml-4">Bank Accounts</h2>
                <BankAccountsList />
            </div>
        </div>
    );
};

export default Profile;