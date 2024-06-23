import { useAuthContext } from './useAuthContext';
import { useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const { dispatch } = useAuthContext();

   

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();
          
            if (!response.ok) {
                setError(json.error);
            } else {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({ type: 'LOGIN', payload: json });
            }
        } catch (error) {
            setError('Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
