import React from "react";
import AccountSelector from "./AccountSelector";
import DateFilter from "./DateFilter";
import CategoriesSortSelector from "./CategoriesSortSelector";

export default function ExpensesHeader({
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
          <h1 className="text-2xl font-semibold mb-2">Category Expenses</h1>
        </div>
        <AccountSelector selectedAccount={selectedAccount} onChange={onAccountChange} />
      </div>
      
      <div className="w-full flex flex-row items-center justify-between mb-4">
        <div>
          <DateFilter onDateChange={onDateChange} />
        </div>
        <div className="mr-8">
          <CategoriesSortSelector
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={onSortChange}
          />
        </div>
      </div>
    </>
  );
}