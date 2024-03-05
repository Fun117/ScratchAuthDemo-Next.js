// /src/components/api/scratchAuth.ts

'use server';

// ユーザー情報を取得する関数
export const ScratchAuthGET_UserProfile = async (username: string): Promise<any> => {
    const response = await fetch(`https://api.scratch.mit.edu/users/${username}`);
    const userData = await response.json();
    return userData;
};