import { API_PRODUCT } from "../config";

export async function getProduct() {
    const res = await fetch(API_PRODUCT)
    return res.json()
}
