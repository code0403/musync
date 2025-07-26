import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface Authstore {
    isAdmin : boolean,
    error : string | null,
    isLoading : boolean;

    checkAdminStatus : () => Promise<void>;
    reset : () => void;
}


export const useAuthstore = create<Authstore>((set) => ({
    isAdmin : false,
    isLoading : false,
    error : null,

    checkAdminStatus : async () => {
        set({ isLoading : true, error : null });
        try {
            const response  = await axiosInstance.get('/admin/check-admin');
            set({ isAdmin : response.data.admin });
        } catch (error :any) {
            set({isAdmin: false, error : error?.response?.data?.message || "Unknow error"});
        } finally {
            set({isLoading : false});
        }
    },

    reset : () => {
        set({ isAdmin : false, isLoading: false, error : null });
    }
}));
