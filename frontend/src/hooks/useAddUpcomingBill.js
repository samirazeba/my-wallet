import {useState} from "react";
import axiosInstance from "../api/axiosInstance";

export default function addUpcomingBill() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addBill = async (data) => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.post(`/transactions/add-upcoming-bill`, data);
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.response?.data?.error || "Failed to add bill.");
            setLoading(false);
            return false;
        }
    };
    return { addBill, loading, error };
}