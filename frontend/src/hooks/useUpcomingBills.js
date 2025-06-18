import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useUpcomingBills(selectedAccount, dateFilter, sortBy, sortOrder) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = `/transactions/upcoming-bills/${localStorage.getItem("user_id")}`;
    const params = [];
    if (selectedAccount) {
      params.push(`bank_account_id=${selectedAccount}`);
    }
    if (dateFilter?.start) {
      params.push(`start=${dateFilter.start}`);
    }
    if (dateFilter?.end) {
      params.push(`end=${dateFilter.end}`);
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
      .then((res) => setBills(res.data))
      .catch((err) => setError(err.response?.data?.error || "Error fetching bills"))
      .finally(() => setLoading(false));
  }, [selectedAccount, dateFilter, sortBy, sortOrder]);

  return { bills, loading, error };
}