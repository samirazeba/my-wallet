import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useMonthlyExpenses(selectedAccount, dateFilter) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const userId = localStorage.getItem("user_id");
    let url = `/transactions/all-expenses/${userId}`;
    const params = [];
    if (selectedAccount) params.push(`bank_account_id=${selectedAccount}`);
    if (dateFilter && dateFilter.start && dateFilter.end)
      params.push(`start=${dateFilter.start}&end=${dateFilter.end}`);
    if (params.length) url += "?" + params.join("&");

    axiosInstance
      .get(url)
      .then((res) => {
        // Group by month
        const grouped = {};
        res.data.forEach((tx) => {
          const month = tx.created_at.slice(0, 7); // YYYY-MM
          grouped[month] = (grouped[month] || 0) + Number(tx.amount);
        });
        setData(
          Object.entries(grouped).map(([month, total]) => ({
            month,
            total,
          }))
        );
      })
      .catch(() => setError("Failed to fetch monthly expenses"))
      .finally(() => setLoading(false));
  }, [selectedAccount, dateFilter]);

  return { data, loading, error };
}