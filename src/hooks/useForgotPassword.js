import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const resetPass = async (email, newPassword, answer) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.post(
        `/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (!data.success) {
        console.log("error from useForgotPaa");
        setError(data.error);
        toast.error(data.message);
      }
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      setError("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPass, isLoading, error };
};
