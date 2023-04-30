import { useDispatch, useSelector } from "react-redux"
import { login } from '../actions/login'

const useLogin = () => {
    const dispatch = useDispatch()
    const { fetching, token, isLoggedIn, userComplete} = useSelector((state: any) => state.login)
    const loginFunc = (credentials: any) => dispatch(login(credentials))

    return {
        token,
        fetching,
        loginFunc,
        isLoggedIn,
        userComplete
    }
}

export default useLogin