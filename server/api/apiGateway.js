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

export function getAllCategories(token) {
    const url = `${config.apiGateway}/categories`
    return Request.get(url, token)
}

export function getAllProducts(token) {
    const url = `${config.apiGateway}/products`
    return Request.get(url, token)
}

export function createProduct(product, token) {
    const url = `${config.apiGateway}/products`
    return Request.post(url, product, token)
}

export function addInventory({productId}, {stock}, token) {
    const url = `${config.apiGateway}/products/${productId}/inventory`
    return Request.put(url, {stock}, token)
}

export function getAllCustomers(token) {
    const url = `${config.apiGateway}/customers`
    return Request.get(url, token)
}

export function createCustomer(customer, token) {
    const url = `${config.apiGateway}/customers`
    return Request.post(url, customer, token)
}

export function getAllCountries() {
    const url = `${config.apiGateway}/countries`
    return Request.get(url)
}

export function getCitiesByCountry({country}) {
    const url = `${config.apiGateway}/countries/${country}/cities`
    return Request.get(url)
}

export function getAllVisits(token) {
    const url = `${config.apiGateway}/visits`
    return Request.get(url, token)
}

export function getAllSellers(token) {
    const url = `${config.apiGateway}/sellers`
    return Request.get(url, token)
}

export function getAllOrders(token) {
    const url = `${config.apiGateway}/orders`
    return Request.get(url, token)
}