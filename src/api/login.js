import {post} from './request';

export function login(body) {
    return post('/api/login', {}, body)
}