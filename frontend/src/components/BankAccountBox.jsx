import React from "react";
import useBankAccounts from "../hooks/useBankAccounts";
import maskAccountNumber from "../utils/maskAccountNumber";

export default function BankAccountBox({ selectedAccount }) {
  const accounts = useBankAccounts();
  const account = accounts.find(acc => acc.id === Number(selectedAccount));

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      {account ? (
        <>
          <div className="font-semibold">Bank: {account.bank_name}</div>
          <div>Account: {maskAccountNumber(account.account_number)}</div>
          <div>
            Balance: <span className="font-bold">{account.balance} BAM</span>
          </div>
        </>
      ) : (
        <div className="text-gray-600 text-center py-4">
          <div className="font-semibold mb-1">All Bank Accounts</div>
          <div>These are your finances for all bank accounts you possess.</div>
          <div>(You can select an account to view its details)</div>
        </div>
      )}
    </div>
  );
}