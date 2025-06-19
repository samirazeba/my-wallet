import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import AddSavingGoalModal from "./AddSavingGoalModal";
import EditSavingGoalModal from "./EditSavingGoalModal";
import useDeleteSavingGoal from "../hooks/useDeleteSavingGoal";
import useAddSavingGoal from "../hooks/useAddSavingGoal";
import useEditSavingGoal from "../hooks/useEditSavingGoal";

export default function SavingGoalsList({ goals, loading, error, onRefresh }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const { deleteSavingGoal, loading: deleteLoading } = useDeleteSavingGoal();
  const { addSavingGoal, loading: addLoading } = useAddSavingGoal();
  const { editSavingGoal, loading: editLoading } = useEditSavingGoal();

  const handleDelete = (goal) => {
    setGoalToDelete(goal);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!goalToDelete) return;
    await deleteSavingGoal(goalToDelete.id);
    setConfirmOpen(false);
    setGoalToDelete(null);
    onRefresh?.();
  };

  const handleAddGoal = async (form) => {
    const userId = localStorage.getItem("user_id");
    const result = await addSavingGoal({ ...form, user_id: userId });
    if (result) {
      setAddModalOpen(false);
      onRefresh?.();
    }
  };

  const handleEdit = (goal) => {
    setSelectedGoal(goal);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (form) => {
    if (!selectedGoal) return;
    const result = await editSavingGoal(selectedGoal.id, form);
    if (result) {
      setEditModalOpen(false);
      setSelectedGoal(null);
      onRefresh?.();
    }
  };

  function cleanAIResponse(ai_response) {
    if (!ai_response) return "";
    return ai_response.replace(/<think>[\s\S]*?<\/think>\s*/i, "").trim();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-start mb-4">
        <button
          className="bg-[#b3c7e6] text-base font-semibold text-gray-700 shadow-sm hover:bg-[#9bb6db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-4 py-1.5 rounded transition"
          onClick={() => setAddModalOpen(true)}
        >
          Add Saving Goal
        </button>
      </div>
      <AddSavingGoalModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddGoal}
        loading={addLoading}
      />
      {loading && (
        <div className="text-center py-6 text-gray-500">Loading...</div>
      )}
      {error && <div className="text-center py-6 text-red-600">{error}</div>}
      {!loading && !error && goals.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No saving goals found.
        </div>
      )}
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="bg-white shadow rounded-2xl p-4 border border-gray-200 mb-2"
        >
          <div className="flex flex-row justify-between items-start">
            <div className="flex-1">
              {/* Stack name, target amount, and date vertically */}
              <div className="mb-3">
                <div>
                  <span className="font-semibold text-gray-700">Name: </span>
                  <span className="text-gray-900 italic-bold">{goal.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Target: </span>
                  <span className="text-gray-900">
                    {goal.target_amount} {goal.currency || "USD"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Target date:{" "}
                  </span>
                  <span className="text-gray-900">
                    {goal.target_date
                      ? new Date(goal.target_date).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </div>
              <hr className="my-2 border-gray-200" />
              <div className="font-semibold text-md mb-1">Your question:</div>
              <div className="mb-2 text-gray-700">{goal.goal_description}</div>
              <div className="font-semibold text-md mb-1">AI response:</div>
              <div className="mb-2 text-gray-800">
                {cleanAIResponse(goal.ai_response)}
              </div>
              <div className="text-xs text-gray-400">
                {goal.created_at
                  ? new Date(goal.created_at).toLocaleString()
                  : ""}
              </div>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button
                className="text-gray-400 hover:text-blue-600"
                title="Edit"
                onClick={() => handleEdit(goal)}
              >
                <i className="fa fa-edit" />
              </button>
              <button
                className="text-gray-400 hover:text-red-600"
                title="Delete"
                onClick={() => handleDelete(goal)}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <EditSavingGoalModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedGoal(null);
        }}
        onSubmit={handleEditSubmit}
        loading={editLoading}
        goal={selectedGoal}
      />
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        message="Are you sure you want to delete this saving goal?"
      />
    </div>
  );
}
