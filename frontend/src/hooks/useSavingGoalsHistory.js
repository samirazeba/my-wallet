import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useSavingGoalsHistory(userId, dateFilter) {
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
  }, [userId, dateFilter]);

  return { history, loading, error };
}
