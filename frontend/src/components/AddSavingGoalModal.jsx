import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export default function AddSavingGoalModal({ open, onClose, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    target_amount: "",
    target_date: "",
    goal_description: "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        target_amount: "",
        target_date: "",
        goal_description: "",
      });
    }
  }, [open]);

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
                Add Saving Goal
              </DialogTitle>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Goal name"
                  className="w-full border rounded p-2"
                />
                <input
                  name="target_amount"
                  value={form.target_amount}
                  onChange={handleChange}
                  required
                  type="number"
                  min="1"
                  placeholder="Target amount"
                  className="w-full border rounded p-2"
                />
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Target date
                </label>
                <input
                  name="target_date"
                  value={form.target_date}
                  onChange={handleChange}
                  required
                  type="date"
                  className="w-full border rounded p-2"
                  placeholder="Target date"
                />
                <textarea
                  name="goal_description"
                  value={form.goal_description}
                  onChange={handleChange}
                  required
                  placeholder="Describe your saving goal or ask a question (e.g. How can I save for a trip?)"
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