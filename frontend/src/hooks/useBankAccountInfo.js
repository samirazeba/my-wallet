import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useBankAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/bank-accounts/all")
      .then((res) => setAccounts(res.data))
      .catch(() => setAccounts([]))
      .finally(() => setLoading(false));
  }, []);

  return { accounts, loading };
}