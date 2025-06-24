import React from "react";
import useUpcomingBills from "../hooks/useUpcomingBills";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function UpcomingBillsBox({ selectedAccount, dateFilter }) {
  const { bills, loading, error } = useUpcomingBills(selectedAccount, dateFilter);

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="font-semibold mb-2">Upcoming Bills</div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : bills.length === 0 ? (
        <div>No upcoming bills.</div>
      ) : (
        <div className="space-y-3">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between rounded-lg px-4 py-3 shadow-sm border border-yellow-200"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-yellow-200 text-yellow-700 text-xl">
                  <FaRegCalendarAlt />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{bill.name}</div>
                  <div className="text-xs text-gray-500">
                    Due: {bill.due_date ? bill.due_date.slice(0, 10) : "N/A"}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-red-600">
                  {bill.amount} BAM
                </div>
                {bill.description && (
                  <div className="text-xs text-gray-400">{bill.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}