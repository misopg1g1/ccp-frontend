import config from '../util/getConfig.js'
import { Request } from '../request/index.js'

export function login({ user, password }) {
    const url = `${config.apiGateway}/session/login`
    const hash = '4c43e4f140f341bd5c28d8a8cbd97e35'
    return Request.post(url, {user, password, hash})
}