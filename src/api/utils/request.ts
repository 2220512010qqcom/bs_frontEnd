import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000", // API 基础 URL
    timeout: 10000, // 请求超时时间
    headers: {
        "Content-Type": "application/json",
    },
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        // 可以在这里添加认证 token 等
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        return response;
    },
    (error) => {
        // 对响应错误做点什么
        if (error.response) {
            // 请求已发出，但服务器响应状态码不在 2xx 范围内
            console.error("Response error:", error.response.data);
            alert(`Error: ${error.response.data.message || "请求失败"}`);
        } else {
            // 其他错误
            console.error("Error:", error.message);
        }
        return Promise.reject(error);
    }
);

// 导出 axios 实例
export default service;