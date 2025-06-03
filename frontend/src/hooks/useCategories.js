import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useCategories() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axiosInstance.get("/categories/all")
        .then(res => setCategories(res.data))
        .catch(() => setCategories([]));
    }, []);
    return categories;
}