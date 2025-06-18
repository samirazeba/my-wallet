import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
export default function useDeleteUpcomingBill() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteUpcomingBill = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.delete(`/transactions/delete-upcoming-bill/${id}`);
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.response?.data?.error || "Failed to delete bill.");
            setLoading(false);
            return false;
        }
    };

    return { deleteUpcomingBill, loading, error };
}