import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SavingGoalsHeader from "../components/SavingGoalsHeader";
import SavingGoalsList from "../components/SavingGoalsList";
import SortSelector from "../components/SortSelector";
import useSavingGoals from "../hooks/useSavingGoals";

const SavingGoals = () => {
  const userId = localStorage.getItem("user_id");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [refreshFlag, setRefreshFlag] = useState(false);

  const { goals, loading, error } = useSavingGoals(
    userId,
    sortBy,
    sortOrder,
    refreshFlag,
    dateFilter
  );
  const handleSortChange = (by, order) => {
    setSortBy(by);
    setSortOrder(order);
  };

  const handleRefresh = () => setRefreshFlag((f) => !f);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <SavingGoalsHeader
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onDateChange={setDateFilter}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
        <SavingGoalsList
          goals={goals}
          loading={loading}
          error={error}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
};

export default SavingGoals;
