import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import BankAccountBox from "../components/BankAccountBox";
import ExpensesIncomeBar from "../components/ExpensesIncomeBar";
import SavingGoalBox from "../components/SavingGoalBox";
import RecentTransactions from "../components/RecentTransactions";
import UpcomingBillsBox from "../components/UpcomingBillsBox";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";

const Home = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [dateFilter, setDateFilter] = useState(null);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <DashboardHeader
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onDateChange={setDateFilter}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <BankAccountBox selectedAccount={selectedAccount} />
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
      </div>
    </div>
  );
};

export default Home;
