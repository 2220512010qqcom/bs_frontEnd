import { defineStore } from 'pinia';

export interface UserLogin {
    user_id: number;
}

export interface UserUploads {
    upload_id: number;
    user_id: number;
    heart_rate: number;
    blood_pressure: number | string;
    oxygen_saturation: number;
    upload_date: string; // ISO 8601 格式字符串
}

export interface UserAnalyse {
    riskIndex: string;
    riskLevel: string;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        userLogin: {} as UserLogin,
        userUploads: [] as UserUploads[],
        userAnalyse: {} as UserAnalyse,
    }),
    actions: {
        setUserLogin(data: UserLogin) {
            this.userLogin = data;
        },
        setUserUploads(data: UserUploads[]) {
            this.userUploads = data;
        },
        setUserAnalyse(data: UserAnalyse) {
            this.userAnalyse = data;
        },
    },
});
