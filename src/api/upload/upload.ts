import request from '../utils/request';
import { UserUploads } from '../../stores/userInfo';

/**
 * 上传用户记录的接口函数。
 * 
 * @param userUploads 用户上传的数据对象，包含需要上传的文件及相关信息。
 * @returns 返回一个 Promise，表示上传请求的结果。
 */
export function upload(userUploads: UserUploads) {
    const params = {
        ...userUploads
    }
    return request({
        url: '/upload',
        method: 'POST',
        data: params
    });
}

/**
 * 删除指定用户的上传记录。
 *
 * @param upload_id 上传记录的唯一标识符
 * @param user_id 用户的唯一标识符
 * @returns 返回一个 Promise，表示删除操作的结果
 */
export function deleteUpload(upload_id: string, user_id: string) {
    const params = {
        upload_id,
        user_id
    }
    return request({
        url: `/deleteUpload/${user_id}/${upload_id}`,
        method: 'DELETE',
        data: params
    });
}