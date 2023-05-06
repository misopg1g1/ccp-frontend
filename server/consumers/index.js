import * as api from '../api/apiGateway.js'

export class Consumer {
    constructor() {
        return true
    }

    static login(credentials) {
        return api.login(credentials)
    }

    static createUser(user, token) {
        return api.createUser(user, token)
    }

    static getProduct(productId) {
        return api.getProduct(productId)
    }

    static getAllCategories(token) {
        return api.getAllCategories(token)
    }

    static getAllProducts(token) {
        return api.getAllProducts(token)
    }

    static createProduct(product, token) {
        return api.createProduct(product, token)
    }

    static addInventory(productId, inventoryData, token) {
        return api.addInventory(productId, inventoryData, token)
    }

    static getAllCustomers(token) {
        return api.getAllCustomers(token)
    }

    static createCustomer(customer, token) {
        return api.createProduct(customer, token)
    }

    static getAllCountries() {
        return api.getAllCountries()
    }

    static getCitiesByCountry(country) {
        return api.getCitiesByCountry(country)
    }
}