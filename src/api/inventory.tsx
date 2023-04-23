import { put } from './request'


export function addInventory(productId: string, body: any) {
    return put(`/api/products/${productId}`, body)
}