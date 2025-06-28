import { defineStore } from 'pinia';

export interface UserAvatar {
    user_id: string;
    avatar_url: string;
}

export interface UserBasicAttributes {
    user_id: string;
    gender: string;
    birth_date: Date;
    height: number;
    weight: number;
    user_name: string;
}

export interface UserLogin {
    user_id: string;
}

export interface UserStatistics {
    user_id: string;
    last_login_date: Date;
    region: string;
    last_upload_date: Date;
}

export interface UserUploads {
    upload_id: string;
    user_id: string;
    heart_rate: number;
    blood_pressure: number | string; // 血压可以是字符串格式如 '120/80'
    oxygen_saturation: number;
    upload_time: Date;
}

export interface UserComments {
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

export interface UserFeedback {
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

export interface UserAnalyse {
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
        setUserAnalyse(data: UserAnalyse) {
            this.userAnalyse = data;
        },

        //--------以下为操作假数据的方法，生产环境删除函数定义及其引用即可--------------
        addUserUpload(upload: UserUploads) {
            this.userUploads.push(upload);
        },
        updateUserUpload(uploadId: string, updated: Partial<UserUploads>) {
            const idx = this.userUploads.findIndex(u => u.upload_id === uploadId);
            if (idx !== -1) {
            this.userUploads[idx] = { ...this.userUploads[idx], ...updated };
            }
        },
        deleteUserUpload(uploadId: string) {
            this.userUploads = this.userUploads.filter(u => u.upload_id !== uploadId);
        },
        getUserUploadById(uploadId: string): UserUploads | undefined {
            return this.userUploads.find(u => u.upload_id === uploadId);
        },
        getUserUploadsByDate(date: Date): UserUploads[] {
            return this.userUploads.filter(u => 
            u.upload_time.toDateString() === date.toDateString()
            );
        },

        //初始化各种假数据用于展示使用
        initAll() {
            // 使用假数据初始化各属性用于展示
            this.userAvatar = {
                user_id: 'user123',
                avatar_url: 'https://example.com/avatar.jpg'
            };
            this.userBasicAttributes = {
                user_id: 'user123',
                gender: 'male',
                birth_date: new Date('1990-01-01'),
                height: 175,
                weight: 70,
                user_name: '张三'
            };
            this.userLogin = {
                user_id: 'user123'
            };
            this.userStatistics = {
                user_id: 'user123',
                last_login_date: new Date(),
                region: '北京',
                last_upload_date: new Date()
            };
            this.userUploads = [
                {
                    upload_id: 'upload1',
                    user_id: 'user123',
                    heart_rate: 72,
                    blood_pressure: 120,
                    oxygen_saturation: 98,
                    upload_time: new Date()
                },
                {
                    upload_id: 'upload2',
                    user_id: 'user123',
                    heart_rate: 75,
                    blood_pressure: 118,
                    oxygen_saturation: 97,
                    upload_time: new Date(Date.now() - 86400000) // 1天前
                },
                {
                    upload_id: 'upload3',
                    user_id: 'user123',
                    heart_rate: 70,
                    blood_pressure: 115,
                    oxygen_saturation: 99,
                    upload_time: new Date(Date.now() - 2 * 86400000) // 2天前
                }
            ];
            this.userComments = [
                {
                    comment_id: 'comment1',
                    user_id: 'user123',
                    content: '很棒的应用！',
                    parent_comment_id: '',
                    related_post_id: 'post1',
                    created_at: new Date(),
                    updated_at: new Date(),
                    is_active: true,
                    likes_count: 5,
                    replies_count: 2
                }
            ];
            this.userFeedback = [
                {
                    feedback_id: 'feedback1',
                    user_id: 'user123',
                    content: '希望增加夜间模式',
                    created_at: new Date(),
                    updated_at: new Date(),
                    is_active: true,
                    admin_reply: '感谢您的建议，我们会考虑！',
                    admin_reply_at: new Date(),
                    status: '已回复'
                }
            ];
            this.userAnalyse = {
                riskIndex: '0.2',
                riskLevel: '极低风险'
            };
        }
    },
});