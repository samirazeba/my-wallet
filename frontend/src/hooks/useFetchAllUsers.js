import {useState} from "react";
import axiosInstance from "../api/axiosInstance";

const useFetchAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState (null);
    const [loading, setLoading] = useState (false);

    const fetchAllUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get("/users/all");
            
            setUsers(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to fetch users"
            );
        } finally {
            setLoading(false);
        }
    };
    return {users, error, loading, fetchAllUsers};
};

export default useFetchAllUsers;