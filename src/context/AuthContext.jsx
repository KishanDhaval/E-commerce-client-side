import { useEffect, useReducer, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);

    // default axios
    useEffect(() => {
        if (state.user) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.user.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [state.user]);

    console.log('AuthContext state', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
