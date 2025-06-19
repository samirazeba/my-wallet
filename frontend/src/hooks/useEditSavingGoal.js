import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useEditSavingGoal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editSavingGoal = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.put(`/saving-goals/edit/${id}`, data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to edit saving goal");
      setLoading(false);
      return null;
    }
  };

  return { editSavingGoal, loading, error };
}