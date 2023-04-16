import config from '../util/getConfig.js'
import { Request } from '../request/index.js'

export function login({ user, password, hash }) {
    const url = `${config.apiGateway}/session/login`
    return Request.post(url, {user, password, hash})
}