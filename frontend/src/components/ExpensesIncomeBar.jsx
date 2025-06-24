import React from "react";
import useTotalExpenses from "../hooks/useTotalExpenses";
import useTotalIncomes from "../hooks/useTotalIncomes";

export default function ExpensesIncomeBar({ selectedAccount, dateFilter }) {
  const { total: expenses } = useTotalExpenses(dateFilter, selectedAccount);
  const { total: incomes } = useTotalIncomes(dateFilter, selectedAccount);

  // Calculate the maximum value for scaling
  const maxValue = Math.max(expenses, incomes, 1); // avoid division by zero

  const expensePercent = (expenses / maxValue) * 100;
  const incomePercent = (incomes / maxValue) * 100;

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="font-semibold">Expenses vs. Income</div>
      </div>
      <div className="flex flex-col gap-4 flex-1 justify-center">
        <div className="flex items-center h-12">
          <div className="w-24 text-sm text-[#3b4a6b] font-semibold">Expenses</div>
          <div className="flex-1 h-6 bg-[#f5f7fa] rounded-full overflow-hidden mx-2 relative flex items-center border border-red-100">
            <div
              className="h-6 bg-red-400 rounded-full absolute left-0 top-0 transition-all duration-500"
              style={{ width: `${expensePercent}%`, zIndex: 1 }}
            />
          </div>
          <span className="text-red-600 font-bold ml-2">{expenses} BAM</span>
        </div>
        <div className="flex items-center h-12">
          <div className="w-24 text-sm text-[#3b4a6b] font-semibold">Income</div>
          <div className="flex-1 h-6 bg-[#f5f7fa] rounded-full overflow-hidden mx-2 relative flex items-center border border-green-100">
            <div
              className="h-6 bg-green-400 rounded-full absolute left-0 top-0 transition-all duration-500"
              style={{ width: `${incomePercent}%`, zIndex: 1 }}
            />
          </div>
          <span className="text-green-600 font-bold ml-2">{incomes} BAM</span>
        </div>
      </div>
    </div>
  );
}