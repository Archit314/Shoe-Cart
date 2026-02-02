import { create } from 'zustand'
import { axiosInstance } from '../../lib/axios';

type AuthStoreResponse<T> = {
    status: number,
    message: string,
    data: T[]
}

interface AuthStore{
    authUser: null,
    isLoggingIn: boolean,
    isSigningUp: boolean,
    isCheckingAuth: boolean,
    isLoggingOut: boolean,
    checkAuth: () => Promise<AuthStoreResponse<any>>,
    signIn: (formData: {}) => Promise<AuthStoreResponse<any>>,
    signUp: (formData: {}) => Promise<AuthStoreResponse<any>>,
    logout: () => Promise<AuthStoreResponse<any>>
}

export const useAuthStore = create<AuthStore>((set) => ({

    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: false,
    isLoggingOut: false,

    checkAuth: async () => {

        set({isCheckingAuth: true})
        try {
            const gotResponse = await axiosInstance.get('/user/check-auth')

            set({isCheckingAuth: false, authUser: gotResponse.data})
            return {
                status: gotResponse.data.status,
                message: gotResponse.data.message,
                data: gotResponse.data.data
            }
        } catch (error: any) {
            console.error(error)
            set({isCheckingAuth: false})
            
            if(error.status == 422){
                return {status: error.response.data.status, message: error.response.data.message, data: error.response.data.data}
            }
            
            return {status: 500, message: error.message, data: [] }
        }
    },

    signIn: async (formData) => {

        set({isLoggingIn: true})
        try {
            const gotResponse = await axiosInstance.post('/user/sign-in', formData)

            set({isLoggingIn: false, authUser: gotResponse.data.data})
            console.log(gotResponse);
            
            return {
                status: gotResponse.data.status,
                message: gotResponse.data.message,
                data: gotResponse.data.data
            }
        } catch (error: any) {
            console.error(error)
            set({isLoggingIn: false})
            
            if(error.status == 422){
                return {status: error.response.data.status, message: error.response.data.message, data: error.response.data.data}
            }
            
            return {status: 500, message: error.message, data: [] }
        }
    },

    signUp: async (formData) => {

        set({isSigningUp: true})
        try {
            const gotResponse = await axiosInstance.post('/user/sign-up', formData)

            set({isSigningUp: false, authUser: gotResponse.data.data})
            console.log(gotResponse);
            
            return {
                status: gotResponse.data.status,
                message: gotResponse.data.message,
                data: gotResponse.data.data
            }
        } catch (error: any) {
            console.error(error)
            set({isSigningUp: false})
            
            if(error.status == 422){
                return {status: error.response.data.status, message: error.response.data.message, data: error.response.data.data}
            }
            
            return {status: 500, message: error.message, data: [] }
        }
    },

    logout: async () => {

        set({isLoggingOut: true})
        try {
            const gotResponse = await axiosInstance.get('/user/logout')

            set({isLoggingOut: false, authUser: null})
            console.log(gotResponse);
            
            return {
                status: gotResponse.data.status,
                message: gotResponse.data.message,
                data: gotResponse.data.data
            }
        } catch (error: any) {
            console.error(error)
            set({isLoggingOut: false})
            
            if(error.status == 422){
                return {status: error.response.data.status, message: error.response.data.message, data: error.response.data.data}
            }
            
            return {status: 500, message: error.message, data: [] }
        }
    }
}))