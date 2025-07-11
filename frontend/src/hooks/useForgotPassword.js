import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendForgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axiosInstance.post("/users/forgot-password", { email });
      setSuccess(res.message || "Reset link sent! Please check your email.");
    } catch (err) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return { sendForgotPassword, loading, error, success };
};

export default useForgotPassword;