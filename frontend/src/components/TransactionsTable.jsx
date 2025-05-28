import React from "react";
import useTransactions from "../hooks/useTransactions";

const TransactionsTable = ({ dateFilter }) => {
  const { transactions, loading, error } = useTransactions(dateFilter);

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 shadow rounded-2xl mb-4">
      <div className="overflow-x-auto w-full shadow-md rounded-2xl">
        <table className="w-full text-sm text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300 rounded-tl-2xl">
                Name
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300">
                Category
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300">
                Type
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300">
                Beneficiary
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300">
                Date
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300">
                Amount
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300 rounded-tr-2xl">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500 bg-white rounded-b-2xl">
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-red-600 bg-white rounded-b-2xl">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && transactions.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500 bg-white rounded-b-2xl">
                  No transactions found.
                </td>
              </tr>
            )}
            {!loading && !error &&
              transactions.map((transaction, idx) => (
                <tr
                  key={transaction.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#f5f7fa]"
                  } hover:bg-[#c3cbd6]`}
                >
                  <td className="px-4 py-3 border-b border-gray-200">{transaction.name}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{transaction.category_name}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{transaction.type}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{transaction.beneficiary}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{transaction.created_at}</td>
                  <td className="px-4 py-3 border-b border-gray-200">{transaction.amount}</td>
                  <td className="px-4 py-3 border-b border-gray-200 text-center">
                    <button className="bg-[#b3c7e6] text-gray-700 font-semibold shadow-sm hover:bg-[#9bb6db] px-3 py-1 rounded text-sm transition">
                      View details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;