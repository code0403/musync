import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand';

interface ChatStore {
    users : any[];
    isLoading : boolean;
    error : string | null;
    fetchUsers : () => Promise<void>
}

export const useChatStore = create<ChatStore>((set) => ({
    users : [],
    isLoading :false,
    error : null,


    fetchUsers : async () => {
        set({isLoading : true, error : null});
        try {
            const response = await axiosInstance.get('/users');
            console.log(response.data);
            set({users : response.data});
        } catch (error : unknown) {
            let errorMessage = "Unknown error";
            if (typeof error === "object" && error !== null && "message" in error) {
                errorMessage = String((error as { message?: unknown }).message);
            }
            set({error : errorMessage});
        } finally {
            set({isLoading : false});
            
        }
    }
    
}))