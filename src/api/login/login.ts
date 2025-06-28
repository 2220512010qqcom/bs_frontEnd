import request from '../utils/request';
import { useUserStore , UserAnalyse } from '@/stores/userInfo';
/**
 * 用户登录函数。
 * 
 * 发送包含用户邮箱和密码的POST请求到登录接口，用于用户身份验证。
 * 
 * @param user_email 用户的邮箱地址
 * @param user_password 用户的密码
 * @returns 返回一个Promise，解析为登录请求的响应结果
 */
export function login(user_email: string, user_password: string) {
    return request({
        url: '/login',
        method: 'POST',
        data: {
            user_email,
            user_password,
        },
    });
}

export function shouldLogin() {
    const userStore = useUserStore();
    return Object.keys(userStore.userLogin).length === 0;
}

/**
 * 用户注册函数。
 *
 * 该函数用于向服务器发送用户注册请求，包括用户名、密码、手机号和邮箱。
 *
 * @param user_name 用户名
 * @param user_password 用户密码
 * @param user_phone 用户手机号
 * @param user_email 用户邮箱
 * @returns 返回一个包含注册请求结果的 Promise 对象
 */
export function signup(
    user_name: string,
    user_password: string,
    user_phone: string,
    user_email: string
) {
    return request({
        url: '/signup',
        method: 'POST',
        data: {
            user_name,
            user_password,
            user_phone,
            user_email,
        },
    });
}