import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useBankAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useCallback to avoid unnecessary re-renders
  const fetchAccounts = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/bank-accounts/all")
      .then((res) => setAccounts(res.data))
      .catch(() => setAccounts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return { accounts, loading, fetchAccounts };
}