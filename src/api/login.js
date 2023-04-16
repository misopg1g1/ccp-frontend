import {post} from './request';

export function login(body) {
    body.user = body.username
    return post('/api/login', {}, body)
}