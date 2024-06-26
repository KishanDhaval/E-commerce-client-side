import { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosConfig";
import Loader from "../Loader";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user')) || {}; // Default to empty object if user is null
                if (!user || !user.token) {
                    navigate('/login');
                    return;
                }

                const response = await axiosInstance.get(`/api/v1/auth/user-auth`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (response.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                    navigate('/login'); // Redirect to login if not authenticated
                }
            } catch (error) {
                console.error('Error during authentication check:', error);
                setOk(false);
                navigate('/login'); // Redirect to login if an error occurs
            }
        };

        authCheck();
    }, [navigate]);

    // Show spinner while waiting for authentication check to complete
    if (!ok) {
        return <Loader />;
    }

    return <Outlet />;
}
