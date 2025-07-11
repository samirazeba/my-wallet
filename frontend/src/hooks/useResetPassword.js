import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useResetPassword = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendResetPassword = async (newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axiosInstance.post(
        `/users/reset-password/${token}`,
        { new_password: newPassword }
      );
      setSuccess(res.message || "Password reset successful! You can now log in.");
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return { sendResetPassword, loading, error, success };
};

export default useResetPassword;