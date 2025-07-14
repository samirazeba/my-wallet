import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useLogInUser = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const logInUser = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post("/users/login", { email, password });
            setUser(response.data.user);

            if (response.data.token) {
                localStorage.setItem("jwt_token", response.data.token);
                localStorage.setItem("user_id", response.data.user.id);
            }
            return response.data;
        } catch (err) {
            setError(err.response ? err.response.data.message : "An error occurred");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { user, logInUser, error, loading };
};

export default useLogInUser;