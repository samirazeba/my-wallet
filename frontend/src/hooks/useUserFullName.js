import { useEffect, useState } from "react";
import axios from "axios";

export default function useUserFullName() {
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFullName = async () => {
            try {
                const userId = localStorage.getItem("user_id"); // Make sure you store this at login!
                if (!userId) {
                    throw new Error("User ID not found in localStorage");
                }

                const response = await axios.get(`http://localhost:3000/api/v1/gen/users/getFullName/${userId}`);
                console.log("Full name response:", response.data);
                setFullName(response.data.fullName);
            } catch (err) {
                setError(err.message || "Error fetching full name");
            } finally {
                setLoading(false);
            }
        };

        fetchFullName();
    }, []);

    return { fullName, loading, error };
}
