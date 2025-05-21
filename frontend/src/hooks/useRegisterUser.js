import { useState } from "react";
import axios from "axios";

const useRegisterUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (first_name, last_name, email, phone_number, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/gen/users/register", {
        first_name,
        last_name,
        email,
        phone_number,
        password,
      });
      setUser(response.data.user);
      setLoading(false);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data.errors) {
        // Set field-specific errors
        setError(err.response.data.errors);
      } else {
        // Set a generic error message
        setError({ general: "An error occurred. Please try again later." });
      }
      setLoading(false);
      return null;
    }
  };

  return { user, registerUser, error, loading };
};

export default useRegisterUser;