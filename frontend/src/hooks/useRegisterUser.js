import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useRegisterUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  password
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await axiosInstance.post("/users/register", {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      password: password,
    });

    // Return the backend response data
    return response.data;
  } catch (err) {
    if (err.response?.data?.errors) {
      setError(err.response.data.errors);
    } else if (err.response?.data?.message) {
      setError({ general: err.response.data.message });
    } else {
      setError({ general: "Registration failed. Please try again." });
    }
    return null;
  } finally {
    setLoading(false);
  }
};

  return { user, registerUser, error, loading };
};

export default useRegisterUser;
