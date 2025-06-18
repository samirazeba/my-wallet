import React from "react";

export default function UpcomingBillsList({ bills, loading, error }) {
  if (loading) {
    return <div className="text-center py-6 text-gray-500">Loading...</div>;
  }
  if (error) {
    return <div className="text-center py-6 text-red-600">{error}</div>;
  }
  if (!bills.length) {
    return <div className="text-center py-6 text-gray-500">No upcoming bills found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {bills.map((bill, idx) => (
        <div
          key={idx}
          className="flex flex-row items-center justify-between bg-white shadow rounded-2xl p-4 border border-gray-200"
        >
          <div className="flex flex-row items-center gap-4">
            <span className="text-xl"><i className="fa fa-edit" /></span>
            <div>
              <div className="font-semibold text-lg">{bill.name}</div>
              <div className="text-gray-500 text-sm">{bill.category_name}</div>
              <div className="text-gray-400 text-xs">{bill.last_executed ? new Date(bill.last_executed).toLocaleDateString() : "MM/DD/YYYY"}</div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <span className="text-red-500 font-bold text-lg">-${bill.amount?.toFixed(2) ?? "-.----"}</span>
            <button className="text-gray-400 hover:text-red-600"><i className="fa fa-trash" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}