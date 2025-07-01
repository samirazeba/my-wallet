import React from "react";
import useBankAccounts from "../hooks/useBankAccounts";
import maskAccountNumber from "../utils/maskAccountNumber";

export default function AccountSelector({ selectedAccount, onChange }) {
  const accounts = useBankAccounts();

  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor="bankAccount" className="text-sm font-medium">
        All accounts
      </label>
      <select
        id="bankAccount"
        value={selectedAccount}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg p-1.5 text-sm focus:outline-none focus:ring focus:border-blue-300 w-55"
      >
        <option value="">Select your bank account</option>
        {accounts.map((acc) => (
          <option key={acc.id} value={acc.id}>
            {acc.bank_name} - {maskAccountNumber(acc.account_number)}
          </option>
        ))}
      </select>
    </div>
  );
}
