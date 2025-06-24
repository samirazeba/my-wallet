import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useRecentTransactions(selectedAccount, dateFilter) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = "/transactions/all";
    const params = [];
    if (selectedAccount) params.push(`bank_account_id=${selectedAccount}`);
    if (dateFilter && dateFilter.start && dateFilter.end)
      params.push(`start=${dateFilter.start}&end=${dateFilter.end}`);
    params.push("sort_by=created_at", "sort_order=desc");
    if (params.length) url += "?" + params.join("&");

    axiosInstance
      .get(url)
      .then((res) => setTransactions(res.data.slice(0, 5))) // Only 5 most recent
      .catch(() => setError("Failed to fetch transactions"))
      .finally(() => setLoading(false));
  }, [selectedAccount, dateFilter]);

  return { transactions, loading, error };
}