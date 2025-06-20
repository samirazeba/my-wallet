import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DateFilter from "../components/DateFilter";
import useSavingGoalsHistory from "../hooks/useSavingGoalsHistory";
import SavingGoalsHistoryList from "../components/SavingGoalsHistoryList";
import SortSelector from "../components/SortSelector"; // <-- import

const SavingGoalsHistory = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const [dateFilter, setDateFilter] = useState(null);
  const [sortBy, setSortBy] = useState("updated_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const { history, loading, error } = useSavingGoalsHistory(
    userId,
    dateFilter,
    sortBy,
    sortOrder
  );

  const handleSortChange = (by, order) => {
    setSortBy(by);
    setSortOrder(order);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 shadow rounded-2xl mb-4">
          <div className="flex items-center gap-2">
            <button
              className="text-gray-700 hover:text-gray-600 px-3 py-1 rounded transition"
              onClick={() => navigate("/saving-goals")}
            >
              &larr; Back
            </button>
            <h1 className="text-2xl font-semibold mb-2">
              Saving Goals History
            </h1>
          </div>
        </div>
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <DateFilter onDateChange={setDateFilter} />
        </div>
        <SavingGoalsHistoryList
          history={history}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default SavingGoalsHistory;
