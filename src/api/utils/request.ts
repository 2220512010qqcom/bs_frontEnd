import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://123.57.78.6:443";

interface RequestConfig {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    timeout?: number;
}
/**
 * 忽略证书验证（仅限开发环境，生产环境请勿使用）
 * CapacitorHttp目前不直接支持忽略SSL证书验证。
 * 若在Android/iOS原生层需忽略证书校验，请在原生项目中配置网络安全策略。
 * 这里仅做注释说明，代码层无法直接实现。
 */
/**
 * 通过在HttpOptions中添加sslCertificateMode: 'ignore'参数，尝试忽略SSL证书验证。
 * 注意：该参数仅在部分平台和Capacitor版本中有效，且仅建议在开发环境使用。
 */
const request = async <T = any>(config: RequestConfig): Promise<T> => {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(config.headers || {}),
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const url = `${baseURL}${config.url}`;
    const options: HttpOptions = {
        url,
        headers,
        params: config.params,
        data: config.data,
        method: config.method || 'GET',
        connectTimeout: config.timeout || 10000,
        readTimeout: config.timeout || 10000,
    };

    try {
        const response: HttpResponse = await CapacitorHttp.request(options);
        return response.data as T;
    } catch (error: any) {
        throw error;
    }
};

export default request;
