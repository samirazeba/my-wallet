import React from "react";
import useBankAccountInfo from "../hooks/useBankAccountInfo";

function maskAccountNumber(accountNumber) {
  const str = accountNumber.toString();
  return str.replace(/\d(?=\d{4})/g, "*");
}

const BankAccountsList = ({ onSelect }) => {
  const { accounts, loading } = useBankAccountInfo();

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
          className="w-full bg-white shadow rounded-2xl p-4 flex flex-col gap-1 cursor-pointer"
          onClick={() => onSelect && onSelect(acc.id)}
        >
          <div className="font-semibold">
            Bank: <span className="font-normal">{acc.bank_name}</span>
          </div>
          <div>
            Bank Account:{" "}
            <span className="font-mono">
              {maskAccountNumber(acc.account_number)}
            </span>
          </div>
          <div className="font-semibold">
            Balance: <span className="font-normal">{acc.balance}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankAccountsList;
