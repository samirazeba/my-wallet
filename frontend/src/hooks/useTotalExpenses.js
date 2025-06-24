import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useTotalExpenses(dateFilter, selectedAccount) {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let url = "/transactions/total-expenses/" + localStorage.getItem("user_id");
    const params = [];
    if (dateFilter && dateFilter.start && dateFilter.end) {
      params.push(`start=${dateFilter.start}`, `end=${dateFilter.end}`);
    }
    if (selectedAccount) {
      params.push(`bank_account_id=${selectedAccount}`);
    }
    if (params.length > 0) {
      url += "?" + params.join("&");
    }
    axiosInstance
      .get(url)
      .then((res) => setTotal(res.data.total))
      .catch((err) => setError(err.response?.data?.error || "Error fetching total"))
      .finally(() => setLoading(false));
  }, [dateFilter, selectedAccount]);

  return { total, loading, error };
}