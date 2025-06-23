import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useAddBankAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addBankAccount = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post("/bank-accounts/add", data);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add bank account");
      setLoading(false);
      return false;
    }
  };

  return { addBankAccount, loading, error };
}