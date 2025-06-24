import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import useMonthlyExpenses from "../hooks/useMonthlyExpenses";

export default function MonthlyExpensesChart({ selectedAccount, dateFilter }) {
  const { data, loading, error } = useMonthlyExpenses(selectedAccount, dateFilter);

  return (
    <>
      <div className="rounded-xl p-4 mb-4">
        <h2 className="text-xl font-semibold">Monthly Expenses</h2>
      </div>
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : data.length === 0 ? (
        <div>No expenses data.</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#b3c7e6" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
    </>
  );
}