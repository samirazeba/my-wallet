import React, { useState } from "react";
import useUserFullName from "../hooks/useUserFullName";
import AccountSelector from "./AccountSelector";
import DateFilter from "./DateFilter";

export default function DashboardHeader({ selectedAccount, onAccountChange, onDateChange }) {
  const userId = localStorage.getItem("user_id");
  const { fullName, loading, error } = useUserFullName(userId);

  return (
    <>
      {/* Header box: greeting and account selector */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 shadow rounded-2xl mb-4">
        <div className="flex flex-col mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold mb-2">
            {loading && "Loading..."}
            {error && "Hello, User"}
            {!loading && !error && `Hello, ${fullName}`}
          </h1>
        </div>
        <AccountSelector selectedAccount={selectedAccount} onChange={onAccountChange} />
      </div>
      {/* Date filter below the header box */}
      <DateFilter onDateChange={onDateChange} />
    </>
  );
}