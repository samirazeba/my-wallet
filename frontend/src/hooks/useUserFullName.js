import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useUserFullName() {
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFullName = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                if (!userId) {
                    throw new Error("User ID not found in localStorage");
                }

                const response = await axiosInstance.get(`/users/getFullName/${userId}`);
                console.log("Full name response:", response.data);
                setFullName(response.data.fullName);
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Error fetching full name");
            } finally {
                setLoading(false);
            }
        };

        fetchFullName();
    }, []);

    return { fullName, loading, error };
}