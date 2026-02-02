import {create} from "zustand"
import { axiosInstance } from "../../lib/axios"


type BrandStoreResponse = {
    status: number,
    message: string,
    data: []
}
interface BrandStore {
    isGettingBrands: boolean,
    brands: any[],
    getBrands: (categoryId?: string) => Promise<BrandStoreResponse>
}

export const useBrandStore = create<BrandStore>((set) => ({

    isGettingBrands: false,
    brands: [],

    getBrands: async (categoryId?: string) => {
        set({isGettingBrands: true})

        try {

            const apiEndpoint = categoryId? `/user/brand?categoryId=${categoryId}` : `/user/brand`;
            const gotBrands = await axiosInstance.get(apiEndpoint)

            set({isGettingBrands: false, brands: gotBrands.data.data})

            return {
                status: gotBrands.data.status,
                message: gotBrands.data.message,
                data: gotBrands.data.data
            }
            
        } catch (error: any) {
            console.log(error);
            set({isGettingBrands: false, brands: []})

            if(error.status == 422){
                return {
                    status: error.response.data.status,
                    message: error.response.data.message,
                    data: error.response.data.data
                }
            }

            return{
                status: 500,
                message: error.message,
                data: []
            }
        }
    }
}))