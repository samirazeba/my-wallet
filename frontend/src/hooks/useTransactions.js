import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useTransactions(dateFilter, selectedAccount, sortBy, sortOrder, refreshKey = 0) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = "/transactions/all";
    const params = [];
    if (dateFilter && dateFilter.start && dateFilter.end) {
      params.push(`start=${dateFilter.start}`, `end=${dateFilter.end}`);
    }
    if (selectedAccount) {
      params.push(`bank_account_id=${selectedAccount}`);
    }
    if (sortBy) {
      params.push(`sort_by=${sortBy}`)
    }
    if (sortOrder) {
      params.push(`sort_order=${sortOrder}`);
    }
    if(params.length > 0) {
      url += "?" + params.join("&");
    }
    axiosInstance
      .get(url)
      .then((res) => setTransactions(res.data))
      .catch((err) => setError(err.response?.data?.error || "Error fetching transactions"))
      .finally(() => setLoading(false));
  }, [dateFilter, selectedAccount, sortBy, sortOrder, refreshKey]);

  return { transactions, loading, error };
}