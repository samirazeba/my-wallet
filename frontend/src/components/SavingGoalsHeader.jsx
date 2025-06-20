import React from "react";
import DateFilter from "./DateFilter";
import SortSelector from "./SortSelector";

export default function SavingGoalsHeader({
  onDateChange,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  return (
    <>
      {/* Header box: title and account selector */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 shadow rounded-2xl mb-4">
        <div className="flex flex-col mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold mb-2">Saving Goals</h1>
        </div>
      </div>
      {/* Date filter and sort selector in one row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <DateFilter onDateChange={onDateChange} />
        <SortSelector
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={onSortChange}
        />
      </div>
    </>
  );
}
