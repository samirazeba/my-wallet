import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useBankAccounts(refresh = false) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/bank-accounts/all");
      setAccounts(res.data);
    } catch (error) {
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [refresh]);

  return { accounts, loading, fetchAccounts };
}