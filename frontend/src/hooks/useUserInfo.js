import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useUserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axiosInstance
        .get(`/users/getUserById/${userId}`)
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  return user;
}