import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import BankAccountBox from "../components/BankAccountBox";
import ExpensesIncomeBar from "../components/ExpensesIncomeBar";
import SavingGoalBox from "../components/SavingGoalBox";
import RecentTransactions from "../components/RecentTransactions";
import UpcomingBillsBox from "../components/UpcomingBillsBox";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";
import Modal from "../components/Modal";
import AddBankAccountModal from "../components/AddBankAccountModal";
import useAddBankAccount from "../hooks/useAddBankAccount";

const Home = () => {
  const {
    addBankAccount,
    loading: addBankLoading,
    error: addBankError,
  } = useAddBankAccount();

  const [selectedAccount, setSelectedAccount] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [expiredGoal, setExpiredGoal] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [refreshAccounts, setRefreshAccounts] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    // Fetch expired goals
    fetch(
      `http://localhost:3000/api/v1/gen/saving-goals/get-by-user-id/${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        const expired = (data.savingGoals || []).filter(
          (g) => g.is_expired && !localStorage.getItem(`expired_goal_${g.id}`)
        );
        if (expired.length > 0) {
          setExpiredGoal(expired[0]);
        }
      });
  }, []);

  const handleCloseModal = () => {
    if (expiredGoal) {
      localStorage.setItem(`expired_goal_${expiredGoal.id}`, "acknowledged");
      setExpiredGoal(null);
    }
  };

  const handleAddBankAccount = async (form) => {
    try {
      const user_id = localStorage.getItem("user_id");
      const success = await addBankAccount({ ...form, user_id });
      if (success) {
        setAddModalOpen(false);
        // Trigger refresh by toggling the state
        setRefreshAccounts(prev => !prev);
      } else {
        // Error will be displayed in AddBankAccountModal via addBankError
        console.error("Failed to add bank account");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-2 sm:p-4 md:p-6 ml-0 md:ml-64 transition-all duration-300">
        <DashboardHeader
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onDateChange={setDateFilter}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <BankAccountBox
              selectedAccount={selectedAccount}
              onAddBankAccount={() => setAddModalOpen(true)}
              refresh={refreshAccounts}
            />
            <ExpensesIncomeBar
              selectedAccount={selectedAccount}
              dateFilter={dateFilter}
            />
            <SavingGoalBox />
          </div>
          <div>
            <RecentTransactions
              selectedAccount={selectedAccount}
              dateFilter={dateFilter}
            />
            <UpcomingBillsBox
              selectedAccount={selectedAccount}
              dateFilter={dateFilter}
            />
          </div>
        </div>

        <MonthlyExpensesChart
          selectedAccount={selectedAccount}
          dateFilter={dateFilter}
        />
        {expiredGoal && (
          <Modal open={!!expiredGoal} onClose={handleCloseModal}>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">Saving Goal Ended</h2>
              {Number(expiredGoal.current_amount) >=
              Number(expiredGoal.target_amount) ? (
                <div className="text-green-700 font-semibold">
                  Congratulations! You reached your saving goal "
                  {expiredGoal.name}"!
                </div>
              ) : (
                <div className="text-red-700 font-semibold">
                  Unfortunately, you did not reach your target amount for "
                  {expiredGoal.name}".
                </div>
              )}
              <button
                className="mt-4 px-4 py-2 w-full sm:w-auto bg-blue-500 text-white rounded"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </Modal>
        )}
        <AddBankAccountModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddBankAccount}
          loading={addBankLoading}
          error={addBankError}
        />
      </div>
    </div>
  );
};

export default Home;
