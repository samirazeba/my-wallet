import {useState} from "react";
import axiosInstance from "../api/axiosInstance";

export default function useEditUpcomingBill() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editUpcomingBill = async (id, data) => {
        setLoading(true);
        setError(null);
        try{
            await axiosInstance.put(`/transactions/edit-upcoming-bill/${id}`, data);
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.response?.data?.error || "Failed to edit bill.");
            setLoading(false);
            return false;
        }
    };
    return {editUpcomingBill, loading, error};
}