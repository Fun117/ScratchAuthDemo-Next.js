// /src/app/page.tsx

'use client'

import { useEffect, useState } from 'react';
import Loading from '@/components/element/loading';
import { ScratchAuthGET_UserProfile } from '@/components/api/scratchAuth';
import { _locales } from '@/components/site/_locales';
import { links_config } from '../../public/assets/links';
import { eraseCookie, eraseEncryptedUsername, getDecryptedSessionId, setEncryptedSessionId } from '@/components/api/cookie';

export default function Home() {
    const [isLangLoaded, setPageLoaded] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [userData_profile_bio, set_userData_profile_bio] = useState<any | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (typeof window !== 'undefined') {
                    const storedUsername = getDecryptedSessionId('username');
                    setUsername(storedUsername);
                    console.log('username:',storedUsername);
                    if (storedUsername) {
                        const userData = await ScratchAuthGET_UserProfile(storedUsername);
                        console.log('> userData:',userData,'\n\n> profile.bio:',userData.profile.bio);
                        if(userData.profile.bio){
                            set_userData_profile_bio(userData.profile.bio.replace(/\n/g, '<br>'))
                            //userData.profile.bio = userData.profile.bio.replace(/\n/g, '<br>');
                        }
                        setUserData(userData);
                    } else {
                        //
                    }
                }
                setPageLoaded(true);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (!isLangLoaded) {
            fetchUserData();
        }
    }, [isLangLoaded]);

    if (!isLangLoaded) {
        return <Loading />;
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center w-full h-screen p-5'>
                {userData ? (
                    <>
                        <div className='bg-neutral-300 flex flex-col justify-center items-center gap-4 rounded-lg max-w-[500px] w-full p-5'>
                            <div className='flex flex-col gap-2'>
                                <img src={userData.profile.images['90x90']} alt={`${username} icon`} className='rounded-full w-[90px] h-[90px]' />
                                <h1 className='font-bold text-2xl text-center'>{username}</h1>
                            </div>
                            <div className='flex flex-col rounded-md bg-neutral-200 w-full break-all'>
                                <h3 className='rounded-t-md bg-neutral-500 text-neutral-300 p-2'>{_locales('About me')}</h3>
                                <p className='overflow-scroll text-neutral-600 p-3' dangerouslySetInnerHTML={{ __html: userData_profile_bio }}></p>
                            </div>
                            <div>
                                <button className='w-full px-3 py-2 text-neutral-100 bg-orange-400 border border-slate-300 rounded-md text-sm shadow-sm hover:bg-orange-500 active:opacity-50 active:scale-95 transition ease-in-out duration-300' onClick={() => logout()}>{_locales('Logout')}</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='bg-neutral-300 flex flex-col justify-center items-center gap-4 rounded-lg max-w-[500px] w-full p-5'>
                            <div className='flex flex-col gap-2'>
                                <img src={`/assets/img/scratch/scratch_guest.png`} alt={`${_locales('About me')} icon`} className='rounded-full w-[90px] h-[90px]' />
                                <h1 className='font-bold text-2xl text-center'>{_locales('Guest')}</h1>
                            </div>
                            <div>
                                <button className='w-full px-3 py-2 text-neutral-100 bg-orange-400 border border-slate-300 rounded-md text-sm shadow-sm hover:bg-orange-500 active:opacity-50 active:scale-95 transition ease-in-out duration-300' onClick={() => redirectToAuth()}>{_locales('Login')}</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

// redirect
const redirectToAuth = () => {
    const redirectLocation = btoa(`${links_config.site_origin}/api/auth`); // Base64 encoded

    const username = getDecryptedSessionId('username');
    if (username) {
    } else {
        window.location.href = `https://auth.itinerary.eu.org/auth/?redirect=${redirectLocation}&name=${links_config.site_title}`;
    }
};

const logout = () => {
    // remove the session

    eraseEncryptedUsername('username');

    window.location.href = `/`;
};