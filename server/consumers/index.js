import * as api from '../api/apiGateway.js'

export class Consumer {
    constructor() {
        return true
    }

    static login(credentials) {
        return api.login(credentials)
    }
}