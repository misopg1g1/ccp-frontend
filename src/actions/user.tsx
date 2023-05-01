import {
    CREATE_USER_REQUEST,
    DELETE_USER_DATA
} from '../constants/actionTypes'

export const createUser = (user: any, token: string) => ({type: CREATE_USER_REQUEST, user, token})
export const deleteUserData = () => ({ type: DELETE_USER_DATA })
