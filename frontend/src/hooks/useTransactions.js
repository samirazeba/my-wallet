import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useTransactions(dateFilter) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = "/transactions/all";
    if (dateFilter && dateFilter.start && dateFilter.end) {
      url += `?start=${dateFilter.start}&end=${dateFilter.end}`;
    }
    axiosInstance
      .get(url)
      .then((res) => setTransactions(res.data))
      .catch((err) => setError(err.response?.data?.error || "Error fetching transactions"))
      .finally(() => setLoading(false));
  }, [dateFilter]);

  return { transactions, loading, error };
}