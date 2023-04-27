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

    static addInventory(productId, inventoryData) {
        return api.addInventory(productId, inventoryData)
    }
}