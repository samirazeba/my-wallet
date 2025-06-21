import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useCategoryTotals({ accountId, dateRange, sortBy, sortOrder }) {
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTotals() {
      setLoading(true);
      try {
        const params = {};
        if (dateRange?.start) params.start = dateRange.start;
        if (dateRange?.end) params.end = dateRange.end;
        if (sortBy) params.sort_by = sortBy;
        if (sortOrder) params.sort_order = sortOrder;
        if (accountId) params.bank_account_id = accountId; // If you want to filter by account

        const res = await axiosInstance.get("/categories/totals", { params });
        setTotals(res.data);
      } catch (err) {
        setTotals([]);
      }
      setLoading(false);
    }
    fetchTotals();
  }, [accountId, dateRange, sortBy, sortOrder]);

  return { totals, loading };
}