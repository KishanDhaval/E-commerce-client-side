import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useUpdateProfile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const updateProfile = async (name, email, password, phone, address) => {
    setIsLoading(true);
    setError(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token; // Retrieve the token from the user object

    if (!token) {
      setIsLoading(false);
      setError('No token found. Please log in again.');
      return;
    }

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(`${apiUrl}/api/v1/auth/update-profile`, {
        name,
        email,
        password,
        phone,
        address,
      }, config);

      if (data?.error) {
        setIsLoading(false);
        setError(data.error);
      } else {
        // Update the user in local storage without removing the token
        const updatedUser = {
          ...data.updatedUser,
          token, // Retain the token
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Update the auth context
        dispatch({ type: "LOGIN", payload: updatedUser });

        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error.response || error.message);
      setIsLoading(false);
      setError(error.response?.data?.message || error.message);
    }
  };

  return { updateProfile, isLoading, error };
};
