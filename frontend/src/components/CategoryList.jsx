import React from "react";
import useCategoryTotals from "../hooks/useCategoryTotals";

export default function CategoryList({ accountId, dateRange, sortBy, sortOrder }) {
  const { totals, loading } = useCategoryTotals({
    accountId,
    dateRange,
    sortBy,
    sortOrder,
  });

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading...</div>;
  }
  if (!totals.length) {
    return <div className="text-center py-8 text-gray-500">No data found.</div>;
  }
  return (
    <div className="flex flex-col gap-3 mt-4">
      {totals.map((cat) => (
        <div
          key={cat.category_id}
          className="flex justify-between items-center bg-white rounded-2xl shadow px-4 py-7"
        >
          <span className="font-medium text-xl text-gray-700 ml-4">{cat.category_name}</span>
          <span className="font-semibold text-xl text-gray-900 mr-4"> $ 
            {cat.total_spent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
          </span>
        </div>
      ))}
    </div>
  );
}