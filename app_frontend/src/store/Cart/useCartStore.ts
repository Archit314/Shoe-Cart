import { create } from "zustand"
import { axiosInstance } from "../../lib/axios"

type CartStoreResponse = {
    status: number,
    message: string,
    data: any
}

interface CartStore{
    isGettingCart: boolean,
    cart: any[],
    getCart: () => Promise<CartStoreResponse>,
    addToCart: (productVariantId: number, quantity: number) => Promise<CartStoreResponse>
    updateCartItem: (productVariantId: number, quantity: number) => Promise<CartStoreResponse>,
    removeFromCart: (productVariantId: number) => Promise<CartStoreResponse>
}

export const useCartStore = create<CartStore>((set, get) => ({

    isGettingCart: false,
    cart: [],

    getCart: async () => {

        set({ isGettingCart: true})

        try {
            const getCart = await axiosInstance.get('/user/cart')
            
            set({ isGettingCart: false, cart: getCart.data})
            
            return { status: getCart.data.status, message: getCart.data.message, data: getCart.data.data}
        } catch (error: any) {
            console.error(error)
            set({ isGettingCart: false, cart: [] })

            if(error.response && error.response.data && error.response.data.status === 422){
                return {status: error.response.data.status, message: error.response.data.message, data: error.response.data.data}
            }
            
            return {status: 500, message: error.message, data: [] }
        }
    },

    addToCart: async (productVariantId: number, quantity: number) => {
        try {
            const resp = await axiosInstance.post('/user/cart', { productVariantId, quantity })

            // refresh cart state
            try { await get().getCart() } catch (e) { /* ignore refresh errors */ }

            return { status: resp.data.status, message: resp.data.message, data: resp.data.data }
        } catch (error: any) {
            console.error('addToCart error', error)
            if (error.response && error.response.data) {
                return { status: error.response.data.status ?? 500, message: error.response.data.message ?? error.message, data: error.response.data.data }
            }
            return { status: 500, message: error.message, data: [] }
        }
    }
    ,

    updateCartItem: async (productVariantId: number, quantity: number) => {
        try {
            const resp = await axiosInstance.patch(`/user/cart/${productVariantId}`, { quantity })
            try { await get().getCart() } catch (e) { }
            return { status: resp.data.status, message: resp.data.message, data: resp.data.data }
        } catch (error: any) {
            console.error('updateCartItem error', error)
            if (error.response && error.response.data) {
                return { status: error.response.data.status ?? 500, message: error.response.data.message ?? error.message, data: error.response.data.data }
            }
            return { status: 500, message: error.message, data: [] }
        }
    },

    removeFromCart: async (productVariantId: number) => {
        try {
            const resp = await axiosInstance.delete(`/user/cart/${productVariantId}`)
            try { await get().getCart() } catch (e) { }
            return { status: resp.data.status, message: resp.data.message, data: resp.data.data ?? [] }
        } catch (error: any) {
            console.error('removeFromCart error', error)
            if (error.response && error.response.data) {
                return { status: error.response.data.status ?? 500, message: error.response.data.message ?? error.message, data: error.response.data.data ?? [] }
            }
            return { status: 500, message: error.message, data: [] }
        }
    }
    
}))