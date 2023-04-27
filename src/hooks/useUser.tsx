import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../actions/user'

const useUser = () => {
    const dispatch = useDispatch();
    const { message, fetching } = useSelector((state: any) => state.user)
    const createUserFunc = (user: any, token: string) => dispatch(createUser(user, token))

    return {
        message,
        fetching,
        createUserFunc
    }
}

export default useUser