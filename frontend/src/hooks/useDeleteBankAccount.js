import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useDeleteBankAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteBankAccount = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/bank-accounts/delete/${id}`);
      setLoading(false);
      return true;
    } catch (err) {
      setError("Failed to delete bank account");
      setLoading(false);
      return false;
    }
  };

  return { deleteBankAccount, loading, error };
}