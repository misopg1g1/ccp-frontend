import { useDispatch, useSelector } from "react-redux"
import { login, cleanMessage } from '../actions/login'

const useLogin = () => {
    const dispatch = useDispatch()
    const { error, fetching, token, isLoggedIn, userComplete} = useSelector((state: any) => state.login)

    const cleanMessageFunc = () => dispatch(cleanMessage())
    const loginFunc = (credentials: any) => dispatch(login(credentials))

    return {
        error,
        token,
        fetching,
        loginFunc,
        isLoggedIn,
        userComplete,
        cleanMessageFunc
    }
}

export default useLogin