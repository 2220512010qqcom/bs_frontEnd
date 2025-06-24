import request from '../utils/request';

export function getDemoData() {
    return request({
        url: '/demo/data',
        method: 'get',
    });
}

export function login2(user_email: string, user_password: string) {
    return request({
        url: '/login',
        method: 'post',
        data: {
            user_email,
            user_password,
        },
    });
}