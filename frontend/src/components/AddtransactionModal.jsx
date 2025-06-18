import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import useCategories from "../hooks/useCategories";
import useBankAccounts from "../hooks/useBankAccounts";

export default function AddTransactionModal({ open, onClose, onSubmit, loading, defaultBankAccountId }) {
  const categories = useCategories();
  const accounts = useBankAccounts();

  // Set initial form state, using defaultBankAccountId if provided
  const [form, setForm] = useState({
    bank_account_id: defaultBankAccountId || "",
    category_id: "",
    name: "",
    beneficiary: "",
    amount: "",
    type: "Expense",
    description: "",
  });

  // If defaultBankAccountId changes (e.g., user selects a different account in header), update form
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      bank_account_id: defaultBankAccountId || "",
    }));
  }, [defaultBankAccountId, open]); // also reset when modal opens

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-6 pt-6 pb-4">
              <DialogTitle as="h3" className="text-lg font-semibold text-[#3b4a6b] mb-2">
                Add Transaction
              </DialogTitle>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="w-full border rounded p-2" />
                <input name="beneficiary" value={form.beneficiary} onChange={handleChange} required placeholder="Beneficiary" className="w-full border rounded p-2" />
                <input name="amount" value={form.amount} onChange={handleChange} required type="number" placeholder="Amount" className="w-full border rounded p-2" />
                <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded p-2">
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </select>
                <select name="category_id" value={form.category_id} onChange={handleChange} required className="w-full border rounded p-2">
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {/* Bank Account Selector */}
                <select
                  name="bank_account_id"
                  value={form.bank_account_id}
                  onChange={handleChange}
                  required
                  className="w-full border rounded p-2"
                >
                  <option value="">Select your bank account</option>
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.bank_name} - {acc.account_number}
                    </option>
                  ))}
                </select>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border rounded p-2" />
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={onClose} className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="rounded-md bg-[#b3c7e6] px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-[#9bb6db]">
                    {loading ? "Adding..." : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}