// /src/app/api/auth/auth.ts

'use server';

import crypto from 'crypto';
import { links_config } from "../../../../public/assets/links";

export async function ScratchAuth_verifyToken(privateCode: string): Promise<any> {
    try {
        const res = await fetch(`https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`);
        const data = await res.json();
        
        if (data.valid === true && data.redirect === `${links_config.site_origin}/api/auth`) {
            let sessionId = crypto.randomUUID();
            //console.log({ sessionId, data });
            return JSON.stringify({ sessionId, data });
        }
    } catch (error) {
        console.error("Error:", error);
    }
    return undefined;
}
