import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useAddToSavingGoal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToSavingGoal = async ({ goal_id, bank_account_id, amount }) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/saving-goals/add-to-goal",
        { goal_id, bank_account_id, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add to saving goal");
      setLoading(false);
      return null;
    }
  };

  return { addToSavingGoal, loading, error };
}