import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import useCategories from "../hooks/useCategories";
import useBankAccounts from "../hooks/useBankAccounts";

export default function AddUpcomingBillModal({
  open,
  onClose,
  onSubmit,
  loading,
  userId,
  defaultBankAccountId,
}) {
  const categories = useCategories();
  const { accounts, loading: accountsLoading } = useBankAccounts(); // Destructure the hook

  const [form, setForm] = useState({
    user_id: userId || "",
    category_id: "",
    name: "",
    beneficiary: "",
    amount: "",
    type: "Expense",
    bank_account_id: defaultBankAccountId || "",
    repeat_every: "",
    repeat_unit: "",
    next_execution_date: "",
    last_executed: "",
    description: "",
    active: "true",
  });

  // Reset form when modal opens
  React.useEffect(() => {
    if (open) {
      setForm({
        user_id: userId || "",
        category_id: "",
        name: "",
        beneficiary: "",
        amount: "",
        type: "Expense",
        bank_account_id: defaultBankAccountId || "",
        repeat_every: "",
        repeat_unit: "",
        next_execution_date: "",
        last_executed: "",
        description: "",
        active: "true",
      });
    }
  }, [open, userId, defaultBankAccountId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.bank_account_id) {
      onSubmit(form);
    } else {
      alert("Please select a bank account");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-6 pt-6 pb-4">
              <DialogTitle
                as="h3"
                className="text-lg font-semibold text-[#3b4a6b] mb-2"
              >
                Add Upcoming Bill
              </DialogTitle>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                  className="w-full border rounded p-2"
                />
                <input
                  name="beneficiary"
                  value={form.beneficiary}
                  onChange={handleChange}
                  required
                  placeholder="Beneficiary"
                  className="w-full border rounded p-2"
                />
                <input
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder="Amount"
                  className="w-full border rounded p-2"
                />
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                >
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </select>
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  required
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <select
                  name="bank_account_id"
                  value={form.bank_account_id}
                  onChange={handleChange}
                  required
                  className="w-full border rounded p-2"
                  disabled={accountsLoading} // Disable while loading
                >
                  <option value="">
                    {accountsLoading ? "Loading accounts..." : "Select your bank account"}
                  </option>
                  {accounts && accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.bank_name} - {acc.account_number}
                    </option>
                  ))}
                </select>
                <input
                  name="repeat_every"
                  value={form.repeat_every}
                  onChange={handleChange}
                  required
                  placeholder="Repeat Every (e.g. 1)"
                  className="w-full border rounded p-2"
                />
                <select
                  name="repeat_unit"
                  value={form.repeat_unit}
                  onChange={handleChange}
                  required
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Repeat Unit</option>
                  <option value="Day">Day</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                </select>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Next execution date
                </label>
                <input
                  name="next_execution_date"
                  value={form.next_execution_date}
                  onChange={handleChange}
                  required
                  type="date"
                  className="w-full border rounded p-2"
                  placeholder="Next execution date"
                />
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last executed
                </label>
                <input
                  name="last_executed"
                  value={form.last_executed}
                  onChange={handleChange}
                  type="date"
                  className="w-full border rounded p-2"
                  placeholder="Last executed (optional)"
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full border rounded p-2"
                />
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}