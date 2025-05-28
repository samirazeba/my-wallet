import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useTransactionDetails(transactionId) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!transactionId) return;
    setLoading(true);
    setError(null);
    axiosInstance
      .get(`/transactions/view/${transactionId}`)
      .then((res) => {
        // Your backend returns an array, so get the first item
        setDetails(res.data[0]);
      })
      .catch((err) => setError("Failed to fetch details"))
      .finally(() => setLoading(false));
  }, [transactionId]);

  return { details, loading, error };
}