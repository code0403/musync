import { axiosInstance } from '@/lib/axios';
import { useAuthstore } from '@/stores/useAuthstore';
import { useAuth } from '@clerk/clerk-react'
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const updateApiToken = (token : string | null) => {
    if( token ) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers.common['Authorization']
    }
};

const AuthProvider = ({children} : {children : React.ReactNode}) => {

    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const {checkAdminStatus} = useAuthstore();

    useEffect(()=>{
        const initAuth = async() => {
            try {
                const token = await getToken();
                updateApiToken(token);
                if(token){
                    await checkAdminStatus();
                }
            } catch (error) {
                updateApiToken(null);
                console.log("Error in the initAuth", error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, [getToken, checkAdminStatus]);

    if (loading) {
        return (
            <div className='h-screen w-full flex items-center justify-center'>
                <Loader className='size-6 animate-spin text-emerald-500' />
            </div>
        );
    }
  return (
    <>
    {children}
    </>
  )
}

export default AuthProvider;
