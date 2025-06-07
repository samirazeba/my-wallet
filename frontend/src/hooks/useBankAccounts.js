import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useBankAccounts() {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    axiosInstance.get("/bank-accounts/all")
      .then(res => setAccounts(res.data))
      .catch(() => setAccounts([]));
  }, []);
  return accounts;
}