import {create} from "zustand"
import {axiosInstance} from "../../lib/axios"

type CategoryStoreResponse = {
    status: number
    message: string
    data: []
}

interface CategoryStore {
    isGettingCategories: boolean,
    categories: any[],
    getCategories: () => Promise<CategoryStoreResponse>
}

export const useCategoryStore = create<CategoryStore>((set) => ({

    isGettingCategories: false,
    categories: [],

    getCategories: async () => {

        set({ isGettingCategories: true })
        try {

            const gotCategories = await axiosInstance.get('/category')

            set({ isGettingCategories: false, categories: gotCategories.data})

            return { status: gotCategories.data.status, message: gotCategories.data.message, data: gotCategories.data.data}
            
        } catch (error: any) {
            console.error(error)
            set({ isGettingCategories: false, categories: [] })

            if(error.status == 422){
                return {status: error.response.data.status, message: error.response.data.message, data: error.response.data.data}
            }
            
            return {status: 500, message: error.message, data: [] }
        }
    }
}))