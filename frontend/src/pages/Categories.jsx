import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CategoriesHeader from "../components/CategoriesHeader";
import CategoryList from "../components/CategoryList";

const Categories = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [sortBy, setSortBy] = useState("category_name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleAccountChange = (accountId) => setSelectedAccount(accountId);
  const handleDateRangeChange = (range) => setDateRange(range);
  const handleSortChange = (sortBy, sortOrder) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <CategoriesHeader
          selectedAccount={selectedAccount}
          onAccountChange={handleAccountChange}
          onDateRangeChange={handleDateRangeChange}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
        <CategoryList
          accountId={selectedAccount}
          dateRange={dateRange}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </div>
    </div>
  );
};

export default Categories;
