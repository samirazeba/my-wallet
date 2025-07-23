import React, { useState } from "react";

const BANKS = [
  "Addiko bank",
  "ASA Banka",
  "BBI",
  "Intesa Sanpaolo Banka",
  "NLB",
  "Privredna nabka",
  "ProCredit Bank",
  "Raffeisen Bank",
  "Sparkasse Bank",
  "UniCredit Bank",
  "Union banka",
  "Ziraat Bank",
];

export default function AddBankAccountModal({ open, onClose, onSubmit, loading, error }) {
  const [form, setForm] = useState({
    bank_name: "",
    account_number: "",
    balance: "",
  });
  const [accountNumberError, setAccountNumberError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Restrict account_number to max 16 digits
    if (name === "account_number") {
      // Only allow digits, and max 16
      const digits = value.replace(/\D/g, "").slice(0, 16);
      setForm({ ...form, [name]: digits });
      setAccountNumberError(""); // Clear error on change
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.account_number.length !== 16) {
      setAccountNumberError("Account number must be exactly 16 digits.");
      return;
    }
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add Bank Account</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            name="bank_name"
            value={form.bank_name}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select Bank</option>
            {BANKS.map((bank) => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
          <input
            name="account_number"
            value={form.account_number}
            onChange={handleChange}
            required
            placeholder="Account Number"
            className="w-full border rounded p-2"
            type="text"
            inputMode="numeric"
            maxLength={16}
          />
          {accountNumberError && (
            <div className="text-red-500 text-sm">{accountNumberError}</div>
          )}
          <input
            name="balance"
            value={form.balance}
            onChange={handleChange}
            required
            placeholder="Balance"
            className="w-full border rounded p-2"
            type="number"
            step="0.01"
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[#b3c7e6] px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-[#9bb6db]"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}