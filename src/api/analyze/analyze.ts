import request from '../utils/request';
import { useUserStore , UserAnalyse } from '@/stores/userInfo';
import { ref } from 'vue';
import { shouldLogin } from '../login/login';


/**
 * 获取指定用户的风险指数。
 * 
 * @param user_id 用户的唯一标识符
 * @returns 返回一个包含分析索引数据的请求结果
 */
export function getAnalyzeIndex(user_id : string) {
    return request({
        url: `/analyze/${user_id}`,
        method: 'GET'
    });
}



/**
 * 获取指定用户的上传记录。
 * 
 * @param user_id 用户的唯一标识符
 * @returns 包含用户记录的请求结果
 */
export function getRecords(user_id: string) {
    return request({
        url: `/getRecord/${user_id}`,
        method: 'GET'
    });
}



/**
 * 判断是否需要获取用户风险指数。
 * 如果 userAnalyse 不存在或为空对象，则返回 true，表示需要获取数据。
 * @returns 如果需要获取用户分析索引数据则返回 true，否则返回 false。
 */
export function shouldFetchUserStoreAnalyzeIndex() {
    const userStore = useUserStore();
    return !userStore.userAnalyse || Object.keys(userStore.userAnalyse).length === 0;
}




/**
 * 判断是否需要获取用户存储的记录。
 * 
 * 如果用户上传的记录数量为 0，则返回 true，表示需要获取用户存储的记录；
 * 否则返回 false。
 *
 * @returns 如果用户上传记录为空则返回 true，否则返回 false。
 */
export function shouldFetchUserStoreRecords() {
    const userStore = useUserStore();
    return userStore.userUploads.length === 0;
}



/**
 * 获取用户分析首页数据并更新用户状态。
 * 
 * 此函数首先检查用户是否需要登录，如果需要则直接返回。
 * 随后获取用户信息，并通过 API 请求获取分析首页数据。
 * 成功获取后，更新用户分析数据到用户状态管理中。
 * 若请求失败，则在控制台输出错误信息。
 */
export function getUserStoreAnalyzeIndex(){
    if (shouldLogin()) {
        return;
    }
    const userStore = useUserStore();
    const IndexData = ref<UserAnalyse | undefined>(undefined)
    getAnalyzeIndex(userStore.userLogin.user_id).then((response) => {
        IndexData.value = {
            riskIndex: response.data.riskIndex,
            riskLevel: response.data.riskLevel
        };
        if (IndexData.value) {
            userStore.setUserAnalyse(
                IndexData.value as UserAnalyse
            );
        }
    }).catch((error) => {
        console.error('Error fetching analyze data:', error);
    });
}




/**
 * 获取用户上传记录并更新用户存储。
 * 
 * 如果用户未登录，则直接返回。
 * 否则，调用 `getRecords` 获取用户上传记录，并将结果存储到用户状态中。
 * 如有错误，将在控制台输出错误信息。
 */
export function getUserStoreRecords() {
    if (shouldLogin()) {
        return;
    }
    const userStore = useUserStore();
    getRecords(userStore.userLogin.user_id).then((response) => {
        if (response.data) {
            userStore.setUserUploads(response.data);
        }
    }).catch((error) => {
        console.error('Error fetching history data:', error);
    });
}


