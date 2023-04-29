import { useDispatch, useSelector } from "react-redux"
import { cleanMessage } from "../actions/message"

const useLogin = () => {
    const dispatch = useDispatch()
    const { message } = useSelector((state: any) => state.message)
    const cleanMessageFunc = () => dispatch(cleanMessage())

    return {
        message,
        cleanMessageFunc
    }
}

export default useLogin