import request from '../utils/request';

export function getDemoData() {
    return request({
        url: '/demo/data',
        method: 'GET',
    });
}