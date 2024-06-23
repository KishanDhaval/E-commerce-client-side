import { useAuthContext } from "./useAuthContext"
import { useLocation } from 'react-router-dom';

export const useLogout =()=>{

    const {dispatch} = useAuthContext()
    const location  = useLocation()
    const logout =()=>{
        // remove user from storage
        localStorage.removeItem('user')
        
        location.state = location.pathname

        // dispatch logout context
        dispatch({type :'LOGOUT'})
    }
    return {logout}
}