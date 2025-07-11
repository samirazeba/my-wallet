import { useState } from 'react';
import axiosInstance from "../api/axiosInstance"

const useEmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Function to verify email code
  const verifyCode = async (email, code) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await axiosInstance.post('/email-verifications/verify-email', { email, code });
      
      setSuccess(true);
      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Function to resend verification code
  const resendCode = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await axiosInstance.post('/email-verifications/resend-verification-code', { email });
      
      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    verifyCode,
    resendCode,
    loading,
    error,
    success
  };
};

export default useEmailVerification;