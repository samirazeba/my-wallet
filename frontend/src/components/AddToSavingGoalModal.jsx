import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import AccountSelector from "./AccountSelector";

export default function AddToSavingGoalModal({
  open,
  onClose,
  onSubmit,
  loading,
}) {
  const [form, setForm] = useState({ amount: "", bank_account_id: "" });

  useEffect(() => {
    if (open) setForm({ amount: "", bank_account_id: "" });
  }, [open]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <div className="bg-white px-6 pt-6 pb-4">
              <DialogTitle
                as="h3"
                className="text-lg font-semibold text-[#3b4a6b] mb-2"
              >
                Add to Saving Goal
              </DialogTitle>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Select Bank Account
                  </label>
                  <AccountSelector
                    selectedAccount={form.bank_account_id}
                    onChange={(val) =>
                      setForm({ ...form, bank_account_id: val })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Amount
                  </label>
                  <input
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                    type="number"
                    min="1"
                    placeholder="Amount"
                    className="w-full border rounded p-2"
                  />
                </div>
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
