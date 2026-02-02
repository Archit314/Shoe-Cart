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
    getCart: () => Promise<CartStoreResponse>
}

export const useCartStore = create<CartStore>((set) => ({

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

            if(error.status == 422){
                return {status: error.response.data.status, message: error.response.data.message, data: error.response.data.data}
            }
            
            return {status: 500, message: error.message, data: [] }
        }
    }
    
}))