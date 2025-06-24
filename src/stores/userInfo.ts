import { defineStore } from 'pinia';

interface UserAvatar {
    user_id: string;
    avatar_url: string;
    // created_at: Date;
    // updated_at: Date;
}

interface UserBasicAttributes {
    user_id: string;
    gender: string;
    birth_date: Date;
    height: number;
    weight: number;
    user_name: string;
}

interface UserLogin {
    user_id: string;
    user_name: string;
    user_password: string;
    user_registration_date: Date;
    user_phone: string;
    user_email: string;
}

interface UserStatistics {
    user_id: string;
    last_login_date: Date;
    region: string;
    last_upload_date: Date;
}

interface UserUploads {
    upload_id: string;
    user_id: string;
    heart_rate: number;
    blood_pressure: string;
    oxygen_saturation: number;
    upload_time: Date;
}

interface UserComments {
    comment_id: string;
    user_id: string;
    content: string;
    parent_comment_id: string;
    related_post_id: string;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    likes_count: number;
    replies_count: number;
}

interface UserFeedback {
    feedback_id: string;
    user_id: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    admin_reply: string;
    admin_reply_at: Date;
    status: string;
}

interface UserAnalyse {
    riskIndex: string;
    riskLevel: string;
}
export const useUserStore = defineStore('user', {
    state: () => ({
        userAvatar: {} as UserAvatar,
        userBasicAttributes: {} as UserBasicAttributes,
        userLogin: {} as UserLogin,
        userStatistics: {} as UserStatistics,
        userUploads: [] as UserUploads[],
        userComments: [] as UserComments[],
        userFeedback: [] as UserFeedback[],
        userAnalyse: {} as UserAnalyse,
    }),
    actions: {
        setUserAvatar(data: UserAvatar) {
            this.userAvatar = data;
        },
        setUserBasicAttributes(data: UserBasicAttributes) {
            this.userBasicAttributes = data;
        },
        setUserLogin(data: UserLogin) {
            this.userLogin = data;
        },
        setUserStatistics(data: UserStatistics) {
            this.userStatistics = data;
        },
        setUserUploads(data: UserUploads[]) {
            this.userUploads = data;
        },
        setUserComments(data: UserComments[]) {
            this.userComments = data;
        },
        setUserFeedback(data: UserFeedback[]) {
            this.userFeedback = data;
        },
    },
});