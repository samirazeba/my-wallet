import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useSavingGoals(
  userId,
  sortBy,
  sortOrder,
  refreshFlag,
  dateFilter
) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    axiosInstance
      .get(`/saving-goals/get-by-user-id/${userId}`, {
        params: {
          ...(dateFilter && dateFilter.start && dateFilter.end
            ? { start: dateFilter.start, end: dateFilter.end }
            : {}),
          ...(sortBy ? { sortBy } : {}),
          ...(sortOrder ? { sortOrder } : {}),
        },
      })
      .then((res) => {
        let data = res.data.savingGoals || [];
        if (sortBy) {
          data = [...data].sort((a, b) => {
            if (sortBy === "created_at") {
              return sortOrder === "asc"
                ? new Date(a.created_at) - new Date(b.created_at)
                : new Date(b.created_at) - new Date(a.created_at);
            }
            if (sortBy === "amount") {
              return sortOrder === "asc"
                ? a.target_amount - b.target_amount
                : b.target_amount - a.target_amount;
            }
            return 0;
          });
        }
        setGoals(data);
        setLoading(false);
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status === 404 &&
          err.response.data?.message?.toLowerCase().includes("no saving goals")
        ) {
          setGoals([]);
          setError(null);
        } else {
          setError("Failed to load saving goals");
        }
        setLoading(false);
      });
  }, [userId, sortBy, sortOrder, refreshFlag, dateFilter]);

  return { goals, loading, error };
}
