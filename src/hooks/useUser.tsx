import { useDispatch, useSelector } from 'react-redux'
import { createUser, deleteUserData } from '../actions/user'

const useUser = () => {
    const dispatch = useDispatch();
    const { message, fetching } = useSelector((state: any) => state.user)
    const createUserFunc = (user: any, token: string) => dispatch(createUser(user, token))
    const deleteUserDataFunc = () => dispatch(deleteUserData())

    return {
        message,
        fetching,
        createUserFunc,
        deleteUserDataFunc,
    }
}

export default useUser