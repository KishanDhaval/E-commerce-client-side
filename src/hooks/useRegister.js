import { useAuthContext } from './useAuthContext';
import { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const useRegister = () => {    
    const [error, setError] = useState(null);   
    const [isLoading, setIsLoading] = useState(false);   
    const { dispatch } = useAuthContext();   

    const register = async (name, email, password, phone, address, answer) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/api/v1/auth/register`, {
                name, email, password, phone, address, answer
            })

            const json = response.data;

            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.response && error.response.data ? error.response.data.error : error.message);
        }
    };

    return { register, isLoading, error };
};
