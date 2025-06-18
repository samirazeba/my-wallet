import React from "react";
import AccountSelector from "./AccountSelector";
import DateFilter from "./DateFilter";
import SortSelector from "./SortSelector";

export default function UpcomingBillsHeader({
  selectedAccount,
  onAccountChange,
  onDateChange,      
  sortBy,
  sortOrder,
  onSortChange,
}) {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 shadow rounded-2xl mb-4">
        <div className="flex flex-col mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold mb-2">Upcoming Bills</h1>
        </div>
        <AccountSelector selectedAccount={selectedAccount} onChange={onAccountChange} />
      </div>
      {/* Filter left, SortSelector right with right margin */}
      <div className="w-full flex flex-row items-center justify-between mb-4">
        <div>
          <DateFilter onDateChange={onDateChange} />
        </div>
        <div className="mr-8">
          <SortSelector
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={onSortChange}
          />
        </div>
      </div>
    </>
  );
}