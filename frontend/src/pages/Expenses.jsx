import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import ExpensesHeader from "../components/ExpensesHeader";
import ExpensesTable from "../components/ExpensesTable";

const Expenses = () => {

  const [selectedAccount, setSelectedAccount] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <ExpensesHeader
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onDateChange={setDateFilter}
        />
        <ExpensesTable
          selectedAccount={selectedAccount}
          dateFilter={dateFilter}
        />
      </div>
    </div>
  );
};

export default Expenses;
