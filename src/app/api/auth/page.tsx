// /src/app/api/auth/page.tsx

'use client'

import { useEffect, useState } from 'react';
import Loading from '@/components/element/loading';
import { ScratchAuth_verifyToken } from './auth';

export default function Home() {

    const [isLangLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                if(typeof window !== 'undefined') {
                    const paramsString = window.location.search;
                    const searchParams = new URLSearchParams(paramsString);
                    const privateCode = searchParams.get("privateCode");
                    if (privateCode){
                        const res = await ScratchAuth_verifyToken(privateCode);
                        if(res){
                            const obj = JSON.parse(res);
                            sessionStorage.setItem('username', obj.data.username);
                            window.location.href=(window.location.origin);
                            return true;
                        }else{
                            window.location.href=(window.location.origin);
                        }
                    }else{
                        window.location.href=(window.location.origin);
                    }
                }
                setPageLoaded(true);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (!isLangLoaded) {
            fetchLanguage();
        }
    }, [isLangLoaded]);

    if (!isLangLoaded) {
        return <Loading />;
    }
    
    return (
        <>
        <h1>loading</h1>
        </>
    );
}