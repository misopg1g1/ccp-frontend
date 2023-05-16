import { post } from './request';

export function login(body: any) {
    return post('/api/login', {}, body)
}