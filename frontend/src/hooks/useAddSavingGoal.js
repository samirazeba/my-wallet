import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useAddSavingGoal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addSavingGoal = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/saving-goals/add", data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add saving goal");
      setLoading(false);
      return null;
    }
  };

  return { addSavingGoal, loading, error };
}