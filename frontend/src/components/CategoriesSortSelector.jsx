import React from "react";

export default function CategoriesSortSelector({ sortBy, sortOrder, onSortChange }) {
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
        <option value="category_name_asc">A-Z</option>
        <option value="category_name_desc">Z-A</option>
        <option value="total_spent_desc">Largest amount</option>
        <option value="total_spent_asc">Smallest amount</option>
      </select>
    </div>
  );
}