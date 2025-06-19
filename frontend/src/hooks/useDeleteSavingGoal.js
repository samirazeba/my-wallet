import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useDeleteSavingGoal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteSavingGoal = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/saving-goals/delete/${id}`);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Failed to delete saving goal");
      setLoading(false);
      return false;
    }
  };

  return { deleteSavingGoal, loading, error };
}