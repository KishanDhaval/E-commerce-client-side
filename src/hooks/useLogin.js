import axiosInstance from '../utils/axiosConfig';
import { useAuthContext } from './useAuthContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const { data } = await axiosInstance.post(`/api/v1/auth/login`, { email, password });

            if (!data.success) {
                setError(data.error);
                toast.error(data.message);
            } else {
                localStorage.setItem('user', JSON.stringify(data));
                dispatch({ type: 'LOGIN', payload: data });
                toast.success(data.message);
            }
        } catch (error) {
            setError('Failed to login. Please try again.');
            toast.error('Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
