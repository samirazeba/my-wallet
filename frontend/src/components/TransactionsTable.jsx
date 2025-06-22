import React, { useState } from "react";
import useTransactions from "../hooks/useTransactions";
import useTransactionDetails from "../hooks/useTransactionDetails";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import AddTransactionModal from "./AddTransactionModal";
import useAddTransaction from "../hooks/useAddTransaction";

const TransactionsTable = ({ dateFilter, selectedAccount, sortBy, sortOrder }) => {
  const { transactions, loading, error } = useTransactions(dateFilter, selectedAccount, sortBy, sortOrder);
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const {
    addTransaction,
    loading: addLoading,
    error: addError,
  } = useAddTransaction();

  // Fetch details only when a transaction is selected
  const {
    details,
    loading: detailsLoading,
    error: detailsError,
  } = useTransactionDetails(selectedId);

  const handleViewDetails = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleAddClick = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  const handleAddSubmit = async (formData) => {
    const success = await addTransaction(formData);
    if (success) {
      setAddOpen(false);
      // Optionally, refresh transactions here (e.g., by refetching or using a callback)
      window.location.reload(); // Or use a better state update
    }
  };

  return (
    <div className="w-full flex flex-col bg-white p-4 shadow rounded-2xl mb-4">
      <div className="flex justify-start mb-4">
        <button
          className="bg-[#b3c7e6] text-base font-semibold text-gray-700 shadow-sm hover:bg-[#9bb6db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-4 py-1.5 rounded transition"
          onClick={handleAddClick}
        >
          Add Transaction
        </button>
      </div>
      <AddTransactionModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAddSubmit}
        loading={addLoading}
        defaultBankAccountId={selectedAccount}
      />
      {addError && (
        <div className="text-red-600 text-center mb-2">{addError}</div>
      )}
      <div className="overflow-x-auto w-full shadow-md rounded-2xl">
        <table className="w-full text-sm text-left border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300 rounded-tl-2xl">
                Name
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300">
                Category
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300">
                Type
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300">
                Beneficiary
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300">
                Date
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300">
                Amount
              </th>
              <th className="bg-[#b3c7e6] text-gray-700 font-semibold px-4 py-3 border-b border-gray-300 rounded-tr-2xl">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500 bg-white rounded-b-2xl"
                >
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-red-600 bg-white rounded-b-2xl"
                >
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && transactions.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500 bg-white rounded-b-2xl"
                >
                  No transactions found.
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              transactions.map((transaction, idx) => (
                <tr
                  key={transaction.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#f5f7fa]"
                  } hover:bg-[#c3cbd6]`}
                >
                  <td className="px-4 py-3 border-b border-gray-200">
                    {transaction.name}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {transaction.category_name}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {transaction.type}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {transaction.beneficiary}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {transaction.created_at}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {transaction.amount}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-center">
                    <button
                      className="bg-[#b3c7e6] text-gray-700 font-semibold shadow-sm hover:bg-[#9bb6db] px-3 py-1 rounded text-sm transition"
                      onClick={() => handleViewDetails(transaction.id)}
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Dialog open={open} onClose={handleClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-6 pt-6 pb-4">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-[#3b4a6b] mb-2"
                >
                  Transaction Details
                </DialogTitle>
                {detailsLoading && (
                  <div className="py-4 text-center">Loading...</div>
                )}
                {detailsError && (
                  <div className="py-4 text-center text-red-600">
                    {detailsError}
                  </div>
                )}
                {details && (
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Name:</span>{" "}
                      {details.name}
                    </div>
                    <div>
                      <span className="font-semibold">Category:</span>{" "}
                      {details.category_name}
                    </div>
                    <div>
                      <span className="font-semibold">Type:</span>{" "}
                      {details.type}
                    </div>
                    <div>
                      <span className="font-semibold">Beneficiary:</span>{" "}
                      {details.beneficiary}
                    </div>
                    <div>
                      <span className="font-semibold">Amount:</span>{" "}
                      {details.amount}
                    </div>
                    <div>
                      <span className="font-semibold">Date:</span>{" "}
                      {details.created_at?.slice(0, 10)}
                    </div>
                    {details.description && (
                      <div>
                        <span className="font-semibold">Description:</span>{" "}
                        {details.description}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex justify-center rounded-md bg-[#b3c7e6] px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-[#9bb6db]"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TransactionsTable;
