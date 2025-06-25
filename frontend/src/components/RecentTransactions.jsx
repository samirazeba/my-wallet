import React from "react";
import useRecentTransactions from "../hooks/useRecentTransactions";
import { Link } from "react-router-dom";

export default function RecentTransactions({ selectedAccount, dateFilter }) {
  const { transactions, loading, error } = useRecentTransactions(selectedAccount, dateFilter);

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">Transactions</div>
        <Link
  to="/transactions"
          className="ml-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm text-gray-700"
>
  View all transactions
</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : transactions.length === 0 ? (
        <div>No transactions found.</div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className={`flex items-center justify-between rounded-lg px-4 py-3 shadow-sm border ${
                tx.type === "Expense"
                  ? "border-red-200"
                  : "border-green-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-semibold text-gray-800">{tx.name}</div>
                  <div className="text-xs text-gray-500">
                    {tx.category_name ? tx.category_name + " · " : ""}
                    {tx.created_at ? tx.created_at.slice(0, 10) : ""}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-lg font-bold ${
                    tx.type === "Expense" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {tx.type === "Expense" ? "-" : "+"}
                  {tx.amount} BAM
                </div>
                {tx.beneficiary && (
                  <div className="text-xs text-gray-400">{tx.beneficiary}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
  );
}