import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ExpensesHeader from "../components/ExpensesHeader";
import ExpensesTable from "../components/ExpensesTable";


const Expenses = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  

  const handleSortChange = (by, order) => {
    setSortBy(by);
    setSortOrder(order);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <ExpensesHeader
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onDateChange={setDateFilter}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
        <ExpensesTable
          selectedAccount={selectedAccount}
          dateFilter={dateFilter}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </div>
    </div>
  );
};

export default Expenses;
