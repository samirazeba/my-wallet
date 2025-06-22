import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useUserFirstName() {
    const [firstName, setFirstName] = useState("User");

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (userId) {
            axiosInstance
                .get(`/users/getUserById/${userId}`)
                .then((res) => setFirstName(res.data.first_name))
                .catch(() => setFirstName("User"));
        }
    }, []);
    return firstName;
}