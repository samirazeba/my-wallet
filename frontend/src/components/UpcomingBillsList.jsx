import React, { useState } from "react";
import EditUpcomingBillModal from "./EditUpcomingBillModal";
import AddUpcomingBillModal from "./AddUpcomingBillModal";
import ConfirmModal from "./ConfirmModal";
import useDeleteUpcomingBill from "../hooks/useDeleteUpcomingBill";
import useEditUpcomingBill from "../hooks/useEditUpcomingBill";
import useAddUpcomingBill from "../hooks/useAddUpcomingBill";

export default function UpcomingBillsList({
  bills,
  loading,
  error,
  onRefresh,
  selectedAccount,
}) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [billToDelete, setBillToDelete] = useState(null);

  const { editUpcomingBill, loading: editLoading } = useEditUpcomingBill();
  const { deleteUpcomingBill } = useDeleteUpcomingBill();
  const { addBill, loading: addLoading } = useAddUpcomingBill();

  const handleEdit = (bill) => {
    setSelectedBill(bill);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (form) => {
    if (selectedBill) {
      const success = await editUpcomingBill(selectedBill.id, form);
      if (success) {
        setEditModalOpen(false);
        setSelectedBill(null);
        onRefresh?.();
      }
    }
  };

  /*
  const handleDelete = async (billId) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      setDeleteLoading(true);
      const success = await deleteUpcomingBill(billId);
      setDeleteLoading(false);
      if (success) {
        onRefresh?.();
      }
    }
  };*/

  const handleAddBill = async (form) => {
    const userId = localStorage.getItem("user_id");
    const success = await addBill({ ...form, user_id: userId });
    if (success) {
      setAddModalOpen(false);
      onRefresh?.();
    }
  };
  const handleConfirmDelete = async () => {
    if (!billToDelete) return;
    setDeleteLoading(true);
    const success = await deleteUpcomingBill(billToDelete.id);
    setDeleteLoading(false);
    setConfirmModalOpen(false);
    setBillToDelete(null);
    if (success) {
      onRefresh?.();
    }
  };

  if (loading) {
    return <div className="text-center py-6 text-gray-500">Loading...</div>;
  }
  if (error) {
    return <div className="text-center py-6 text-red-600">{error}</div>;
  }
  if (!bills.length) {
    return (
      <>
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={() => setAddModalOpen(true)}
          >
            Add Upcoming Bill
          </button>
        </div>
        <AddUpcomingBillModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddBill}
          loading={addLoading}
          userId={localStorage.getItem("userId")}
          defaultBankAccountId={selectedAccount}
        />
        <div className="text-center py-6 text-gray-500">
          No upcoming bills found.
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-strat mb-4 ml-8">
        <button
          className="bg-[#b3c7e6] text-base font-semibold text-gray-700 shadow-sm hover:bg-[#9bb6db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-4 py-1.5 rounded transition"
          onClick={() => setAddModalOpen(true)}
        >
          Add Upcoming Bill
        </button>
      </div>
      <AddUpcomingBillModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddBill}
        loading={addLoading}
        userId={localStorage.getItem("user_id")}
      />
      {bills.map((bill) => (
        <div
          key={bill.id}
          className="flex flex-row items-center justify-between bg-white shadow rounded-2xl p-4 border border-gray-200"
        >
          <div className="flex flex-row items-center gap-4">
            <span className="text-xl">
              <i
                className="fa fa-edit"
                onClick={() => handleEdit(bill)}
                style={{ cursor: "pointer" }}
              />
            </span>
            <div>
              <div className="font-semibold text-lg">{bill.name}</div>
              <div className="text-gray-500 text-sm">{bill.category_name}</div>
              <div className="text-gray-400 text-xs">
                {bill.last_executed
                  ? new Date(bill.last_executed).toLocaleDateString()
                  : "MM/DD/YYYY"}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <span className="text-red-600 font-bold text-lg">
              -${bill.amount?.toFixed(2) ?? "-.----"}
            </span>
            <button
              className="text-gray-400 hover:text-red-600"
              onClick={() => {
                setBillToDelete(bill);
                setConfirmModalOpen(true);
              }}
              disabled={deleteLoading}
              title="Delete"
            >
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
      ))}
      <EditUpcomingBillModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        loading={editLoading}
        bill={selectedBill}
      />

      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          setBillToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        message="Are you sure you want to delete this upcoming bill?"
      />
    </div>
  );
}
