import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axiosInstance.post("/users/change-password", {
        current_password: currentPassword,
        new_password: newPassword,
      });
      setSuccess(res.data.message || "Password changed successfully.");
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error, success };
};

export default useChangePassword;