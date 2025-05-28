import {useState} from "react";
import axiosInstance from "../api/axiosInstance";

export default function useAddTransaction() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addTransaction = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const user_id = localStorage.getItem("user_id");
            const payload = {...data, user_id};
            await axiosInstance.post("/transactions/add", payload);
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.response?.data?.error || "Failde to add transaction");
            setLoading(false);
            return false;
        }
    };

    return{ addTransaction, loading, error };
}