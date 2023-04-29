import {post} from './request'

export function createUser(body: any, token: string) {
    const headers = {
        Authorization: `Bearer ${token}`
    }
    return post('/api/user', {}, body, headers)
}