import React from "react";
import AccountSelector from "./AccountSelector";
import DateFilter from "./DateFilter";

export default function UpcomingBillsHeader({ selectedAccount, onAccountChange, onDateChange }) {
  return (
    <>
      {/* Header box: title and account selector */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 shadow rounded-2xl mb-4">
        <div className="flex flex-col mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold mb-2">Upcoming Bills</h1>
        </div>
        <AccountSelector selectedAccount={selectedAccount} onChange={onAccountChange} />
      </div>
      {/* Date filter below the header box */}
      <DateFilter onDateChange={onDateChange} />
    </>
  );
}