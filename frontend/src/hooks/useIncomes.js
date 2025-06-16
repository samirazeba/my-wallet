import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useIncomes(dateFilter, selectedAccount, sortBy, sortOrder) {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        let url = "/transactions/all-incomes/" + localStorage.getItem("user_id");
        const params = [];
        if(dateFilter && dateFilter.start && dateFilter.end) {
            params.push(`start=${dateFilter.start}`, `end=${dateFilter.end}`);
        }
        if (selectedAccount) {
            params.push(`bank_account_id=${selectedAccount}`);
        }
        if (sortBy) {
            params.push(`sort_by=${sortBy}`);
        }
        if(sortOrder) {
            params.push(`sort_order=${sortOrder}`);
        }
        if (params.length > 0) {
            url += "?" + params.join("&");
        }
        axiosInstance
        .get(url)
        .then((res) => setIncomes(res.data))
        .catch((err) => setLoading(err.response?.data?.error || "Error fetching incomes"))
        .finally(() => setLoading(false));
        
    }, [dateFilter, selectedAccount, sortBy, sortOrder]);
    return {incomes, loading, error};
}