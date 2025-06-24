import React, { useState } from "react";
import useIncomes from "../hooks/useIncomes";
import useTransactionDetails from "../hooks/useTransactionDetails";
import useTotalIncomes from "../hooks/useTotalIncomes";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const IncomesTable = ({ dateFilter, selectedAccount, sortBy, sortOrder }) => {
  const { incomes, loading, error } = useIncomes(dateFilter, selectedAccount, sortBy, sortOrder);
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);

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

  const {
      total,
      loading: totalLoading,
      error: totalError,
    } = useTotalIncomes(dateFilter, selectedAccount);

  return (
    <div className="w-full flex flex-col bg-white p-4 shadow rounded-2xl mb-4">
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
                Source
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
                <td colSpan={6} className="text-center py-6 text-gray-500 bg-white rounded-b-2xl">
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-red-600 bg-white rounded-b-2xl">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && incomes.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500 bg-white rounded-b-2xl">
                  No incomes found.
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              incomes.map((income, idx) => (
                <tr
                  key={income.id}
                  className={`transition-colors ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#f5f7fa]"
                  } hover:bg-[#c3cbd6]`}
                >
                  <td className="px-4 py-3 border-b border-gray-200">
                    {income.name}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {income.category_name}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {income.beneficiary}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {income.created_at}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    {income.amount}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-center">
                    <button
                      className="bg-[#b3c7e6] text-gray-700 font-semibold shadow-sm hover:bg-[#9bb6db] px-3 py-1 rounded text-sm transition"
                      onClick={() => handleViewDetails(income.id)}
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end">
          <div className="bg-[#f5f7fa] border border-[#b3c7e6] rounded-xl shadow px-6 py-4 text-lg font-semibold text-gray-700 flex items-center min-w-[280px] -mt-2">
            {totalLoading ? (
              "Calculating total..."
            ) : totalError ? (
              totalError
            ) : (
              <>
                Total Incomes:
                <span className="ml-2 text-gray-700 font-bold">$ {total}</span>
              </>
            )}
          </div>
        </div>
      <Dialog open={open} onClose={handleClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-6 pt-6 pb-4">
                <DialogTitle as="h3" className="text-lg font-semibold text-[#3b4a6b] mb-2">
                  Income Details
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
                      <span className="font-semibold">Name:</span> {details.name}
                    </div>
                    <div>
                      <span className="font-semibold">Category:</span> {details.category_name}
                    </div>
                    <div>
                      <span className="font-semibold">Source:</span> {details.beneficiary}
                    </div>
                    <div>
                      <span className="font-semibold">Amount:</span> {details.amount}
                    </div>
                    <div>
                      <span className="font-semibold">Date:</span> {details.created_at?.slice(0, 10)}
                    </div>
                    {details.description && (
                      <div>
                        <span className="font-semibold">Description:</span> {details.description}
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

export default IncomesTable;