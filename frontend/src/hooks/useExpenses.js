import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useExpenses(dateFilter, selectedAccount, sortBy, sortOrder) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = "/transactions/all-expenses/" + localStorage.getItem("user_id");
    const params = [];
    if (dateFilter && dateFilter.start && dateFilter.end) {
      params.push(`start=${dateFilter.start}`, `end=${dateFilter.end}`);
    }
    if (selectedAccount) {
      params.push(`bank_account_id=${selectedAccount}`);
    }
    if (sortBy) {
      params.push(`sort_by=${sortBy}`);
    }
    if (sortOrder) {
      params.push(`sort_order=${sortOrder}`);
    }
    if (params.length > 0) {
      url += "?" + params.join("&");
    }
    axiosInstance
      .get(url)
      .then((res) => setExpenses(res.data))
      .catch((err) => setError(err.response?.data?.error || "Error fetching expenses"))
      .finally(() => setLoading(false));
  }, [dateFilter, selectedAccount, sortBy, sortOrder]);

  return { expenses, loading, error };
}