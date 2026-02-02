import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";

type ProductStoreResponse<T> = {
    status: number,
    message: string,
    data: T[]
}

interface ProductStore {
    isGettingProducts: boolean,
    isGettingVariants: boolean,
    products: any[],
    variants: any[],
    getProducts: (page?: number, maxRows?: number,categoryId?: string, brandId?: string) => Promise<ProductStoreResponse<any>>,
    getProductVariants: (productId: string) => Promise<ProductStoreResponse<any>>
}

export const useProductStore = create<ProductStore>((set) => ({

    isGettingProducts: false,
    isGettingVariants: false,
    variants: [],
    products: [],

    getProducts: async (page: number = 1, maxRows: number = 5, categoryId?: string | null, brandId?: string | null) => {

        set({isGettingProducts: true})

        try {

            const url = categoryId? `/user/product/list?page=${page}&maxRows=${maxRows}&categoryId=${categoryId}` : brandId? `/user/product/list?page=${page}&maxRows=${maxRows}&brandId=${brandId}`: `/user/product/list?page=${page}&maxRows=${maxRows}`;
            
            const gotCategories = await axiosInstance.get(url)

            set({isGettingProducts: false, products: gotCategories.data.data})

            return { status: gotCategories.data.status, message: gotCategories.data.message, data: gotCategories.data.data}
        } catch (error: any) {
            console.error(error)
            set({isGettingProducts: false, products: []})
            
            if(error.status == 422){
                return {status: error.response.data.status, message: error.response.data.message, data: error.response.data.data}
            }
            
            return {status: 500, message: error.message, data: [] }
        }
    },

    getProductVariants: async (productId: string) => {

        set({isGettingVariants: true})

        try {
            const gotVariants = await axiosInstance.get(`/user/product-variant/${productId}`)

            set({isGettingVariants: false, variants: gotVariants.data.data})

            return { status: gotVariants.data.status, message: gotVariants.data.message, data: gotVariants.data.data}
        } catch (error: any) {
            console.error(error)
            set({isGettingVariants: false, variants: []})
            
            if(error.status == 422){
                return {status: error.response.data.status, message: error.response.data.message, data: error.response.data.data}
            }
            
            return {status: 500, message: error.message, data: [] }
        }
    }
}))