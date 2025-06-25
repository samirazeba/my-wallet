import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import UpcomingBillsHeader from "../components/UpcomingBillsHeader";
import UpcomingBillsList from "../components/UpcomingBillsList";
import useUpcomingBills from "../hooks/useUpcomingBills";

const UpcomingBills = () => {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [dateFilter, setDateFilter] = useState(null); // <-- Add this
  const [sortBy, setSortBy] = useState("last_executed");
  const [sortOrder, setSortOrder] = useState("asc");
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleSortChange = (by, order) => {
    setSortBy(by);
    setSortOrder(order);
  };

  const { bills, loading, error } = useUpcomingBills(
    selectedAccount,
    dateFilter,
    sortBy,
    sortOrder,
    refreshFlag
  );

  const handleRefresh = () => setRefreshFlag((f) => !f)

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <UpcomingBillsHeader
          selectedAccount={selectedAccount}
          onAccountChange={setSelectedAccount}
          onDateChange={setDateFilter} // <-- Pass handler
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
        <UpcomingBillsList bills={bills} loading={loading} error={error} onRefresh={handleRefresh} selectedAccount={selectedAccount}/>
      </div>
    </div>
  );
};

export default UpcomingBills;