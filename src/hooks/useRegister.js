import { useAuthContext } from './useAuthContext';
import { useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import toast from 'react-hot-toast';

export const useRegister = () => {    
    const [error, setError] = useState(null);   
    const [isLoading, setIsLoading] = useState(false);   
    const { dispatch } = useAuthContext();   

    const register = async (name, email, password, phone, address, answer) => {
        setIsLoading(true);
        setError(null);

        try {
            const {data} = await axiosInstance.post(`/api/v1/auth/register`, {
                name, email, password, phone, address, answer
            })

            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(data));

            // update the auth context
            dispatch({ type: 'LOGIN', payload: data });
            setIsLoading(false);
            toast.success(data.message)
        } catch (error) {
            setIsLoading(false);
            setError(error.response && error.response.data ? error.response.data.error : error.message);
            toast.error(data.message)
        }
    };

    return { register, isLoading, error };
};
