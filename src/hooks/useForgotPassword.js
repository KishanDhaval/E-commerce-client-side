import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

export const useForgotPassword = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

   const navigate = useNavigate()

    const login = async (email, newPassword ,answer) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/api/v1/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword ,answer })
            });

            const json = await response.json();

            if (!response.ok) {
                console.log('error from useForgotPaa');
                setError(json.error);
            } 
            navigate('/login')
        } catch (error) {
            setError('Failed to login. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
