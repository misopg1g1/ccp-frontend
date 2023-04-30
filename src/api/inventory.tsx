import { put } from './request'


export function addInventory(productId: string, body: any, token: string) {
    const headers = {
        Authorization: `Bearer ${token}`
    }
    return put(`/api/products/${productId}/inventories`, {}, body, headers)
}