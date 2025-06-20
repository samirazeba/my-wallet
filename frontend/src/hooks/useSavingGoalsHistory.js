import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useSavingGoalsHistory(userId, dateFilter, sortBy, sortOrder) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    axiosInstance
      .get(`/saving-goals/get-history-by-user-id/${userId}`, {
        params:
          dateFilter && dateFilter.start && dateFilter.end
            ? { start: dateFilter.start, end: dateFilter.end }
            : {},
      })
      .then((res) => {
        let data = res.data.savingGoals || [];
        if (sortBy) {
          data = [...data].sort((a, b) => {
            if (sortBy === "updated_at") {
              return sortOrder === "asc"
                ? new Date(a.updated_at) - new Date(b.updated_at)
                : new Date(b.updated_at) - new Date(a.updated_at);
            }
            if (sortBy === "amount") {
              return sortOrder === "asc"
                ? a.old_target_amount - b.old_target_amount
                : b.old_target_amount - a.old_target_amount;
            }
            return 0;
          });
        }
        setHistory(data);
        setLoading(false);
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status === 404 &&
          err.response.data?.message?.toLowerCase().includes("no saving goals")
        ) {
          setHistory([]);
          setError(null);
        } else {
          setError("Failed to load saving goals history");
        }
        setLoading(false);
      });
  }, [userId, dateFilter, sortBy, sortOrder]);

  return { history, loading, error };
}