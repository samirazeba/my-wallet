import React from "react";
import useBankAccounts from "../hooks/useBankAccounts";
import maskAccountNumber from "../utils/maskAccountNumber";

export default function BankAccountBox({ selectedAccount, onAddBankAccount, refresh }) {
  const { accounts, loading } = useBankAccounts(refresh);
  const account = accounts.find(acc => acc.id === Number(selectedAccount));

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      {accounts.length === 0 ? (
        <div className="text-gray-600 text-center py-4">
          <div className="font-semibold mb-2">You have no bank accounts.</div>
          <div className="mb-3">Add a bank account to start tracking your finances.</div>
          <button
            className="bg-[#b3c7e6] text-base font-semibold text-gray-700 shadow-sm hover:bg-[#9bb6db] px-4 py-1.5 rounded transition"
            onClick={onAddBankAccount}
          >
            Add Bank Account
          </button>
        </div>
      ) : account ? (
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