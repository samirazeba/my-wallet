import React, { useEffect } from "react";
import useBankAccounts from "../hooks/useBankAccountInfo";
import maskAccountNumber from "../utils/maskAccountNumber";

const BankAccountsList = ({ refresh, onDelete }) => {
  const { accounts, loading, fetchAccounts } = useBankAccounts();

  useEffect(() => {
    fetchAccounts();
  }, [refresh]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 mt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full bg-white shadow rounded-2xl p-4 flex flex-col gap-2 animate-pulse"
          >
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!accounts.length) {
    return <div className="mt-6 text-gray-500">No bank accounts found.</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      {accounts.map((acc) => (
        <div
          key={acc.id}
          className="w-full bg-white shadow rounded-2xl p-4 flex flex-col gap-1"
        >
          <div className="flex justify-between items-center">
            <div className="font-semibold">
              Bank: <span className="font-normal">{acc.bank_name}</span>
            </div>
            <button
              className="text-gray-400 hover:text-red-600"
              title="Delete"
              onClick={() => onDelete && onDelete(acc.id)}
            >
              <i className="fa fa-trash" />
            </button>
          </div>
          <div>
            Bank Account:{" "}
            <span className="font-mono">
              {maskAccountNumber(acc.account_number)}
            </span>
          </div>
          <div>
            Balance: <span className="font-semibold">{acc.balance} BAM</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankAccountsList;