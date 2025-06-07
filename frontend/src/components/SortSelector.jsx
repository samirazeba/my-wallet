import React from "react";

export default function SortSelector({ sortBy, sortOrder, onSortChange }) {
  return (
    <div className="relative inline-block items-center bg-white p-2 shadow rounded-2xl">
      <label className="text-gray-600 mr-2">Sort by:</label>
      <select
        value={`${sortBy}_${sortOrder}`}
        onChange={(e) => {
          const value = e.target.value;
          const lastUnderscore = value.lastIndexOf("_");
          const by = value.substring(0, lastUnderscore);
          const order = value.substring(lastUnderscore + 1);
          onSortChange(by, order);
        }}
        className="border rounded-lg p-1.5 text-gray-600"
      >
        <option value="created_at_desc">Latest</option>
        <option value="created_at_asc">Oldest</option>
        <option value="amount_desc">Largest amount</option>
        <option value="amount_asc">Smallest amount</option>
      </select>
    </div>
  );
}