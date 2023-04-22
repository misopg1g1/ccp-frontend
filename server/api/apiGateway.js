import config from '../util/getConfig.js'
import { Request } from '../request/index.js'

export function login({ user, password }) {
    const url = `${config.apiGateway}/session/login`
    return Request.post(url, {user, password})
}

export function getProduct({productId}) {
    const url = `${config.apiGateway}/products/${productId}`
    return Request.get(url)
}

export function addInventory({productId}, {stock}) {
    const url = `${config.apiGateway}/products/${productId}/inventories`
    return Request.put(url, {stock})
}