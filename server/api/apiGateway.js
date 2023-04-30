import config from '../util/getConfig.js'
import { Request } from '../request/index.js'

export function login({ user, password }) {
    const url = `${config.apiGateway}/session/login`
    return Request.post(url, {user, password})
}

export function createUser({ user, password, verify_password, role}, token) {
    const url = `${config.apiGateway}/session/create_user`
    return Request.post(url, {user, password, verify_password, role}, token)
}

export function getProduct({productId}) {
    const url = `${config.apiGateway}/products/${productId}`
    return Request.get(url)
}

export function getAllProducts(token) {
    const url = `${config.apiGateway}/products`
    return Request.get(url,token)
}

export function addInventory({productId}, {stock}) {
    const url = `${config.apiGateway}/products/${productId}/inventories`
    return Request.put(url, {stock})
}