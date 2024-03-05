'use server'

import { cookies } from 'next/headers'

async function Cookies_set(name: string, value: string, path: string = '/',) {
    cookies().set({
        name: name,
        value: value,
        httpOnly: true,
        path: path,
    })
}