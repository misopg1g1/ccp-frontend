import {
    CREATE_USER_REQUEST,
} from '../constants/actionTypes'

export const createUser = (user: any, token: string) => ({type: CREATE_USER_REQUEST, user, token})
