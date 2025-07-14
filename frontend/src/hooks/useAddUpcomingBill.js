import {useState} from "react";
import axiosInstance from "../api/axiosInstance";

export default function useAddUpcomingBill() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addBill = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(`/transactions/add-upcoming-bill`, data);
            setLoading(false);
            return true;
        } catch (err) {
            console.error("Add bill error:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Failed to add bill.");
            setLoading(false);
            return false;
        }
    };
    
    return { addBill, loading, error };
}