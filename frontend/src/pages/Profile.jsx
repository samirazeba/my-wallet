import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import ProfileCard from "../components/ProfileCard";
import BankAccountsList from "../components/BankAccountList";
import AddBankAccountModal from "../components/AddBankAccountModal";
import useAddBankAccount from "../hooks/useAddBankAccount";
import useUserInfo from "../hooks/useUserInfo";

const Profile = () => {
  const user = useUserInfo();
  const [showAddModal, setShowAddModal] = useState(false);
  const { addBankAccount, loading, error } = useAddBankAccount();
  const [refresh, setRefresh] = useState(false);

  // To refresh the bank accounts list after adding
  const handleAddBankAccount = async (form) => {
    const success = await addBankAccount(form);
    if (success) {
      setShowAddModal(false);
      setRefresh((r) => !r); // toggle to trigger re-fetch in BankAccountsList
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <ProfileHeader />
        <ProfileCard
          name={user ? `${user.first_name} ${user.last_name}` : undefined}
          email={user?.email}
          phone={user?.phone_number}
        />
        <div className="flex items-center justify-between mt-8 mb-2 ml-4 mr-4">
          <h2 className="text-lg font-semibold">Bank Accounts</h2>
          <button
            className="bg-[#b3c7e6] text-base font-semibold text-gray-700 shadow-sm hover:bg-[#9bb6db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-4 py-1.5 rounded transition"
            onClick={() => setShowAddModal(true)}
          >
            Add Bank Account
          </button>
        </div>
        <BankAccountsList refresh={refresh} />
        <AddBankAccountModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddBankAccount}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Profile;