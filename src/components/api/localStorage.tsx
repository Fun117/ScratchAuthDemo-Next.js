'use client'

// データを保存する関数
export const ScratchAuth_saveData = (key: string, value: any) => {
    const data = {
        value: value,
        timestamp: new Date().getTime() // 現在のタイムスタンプを保存
    };
    localStorage.setItem(key, JSON.stringify(data));
};

// データを取得する関数
export const ScratchAuth_getData = (key: string, expiryInMs: number) => {
    const item = localStorage.getItem(key);
    if (!item) {
        return null;
    }
    const data = JSON.parse(item);
    const now = new Date().getTime();
    if (now - data.timestamp > expiryInMs) {
        // データが有効期限切れの場合、削除してnullを返す
        localStorage.removeItem(key);
        return null;
    }
    return data.value;
};