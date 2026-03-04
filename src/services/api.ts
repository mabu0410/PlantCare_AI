// Axios instance (chuẩn bị cho khi có real backend)
import axios from 'axios';
import { API_URL } from '../utils/hang_so';

const api = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Thêm token nếu cần
        // const token = getToken();
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
    }
);

export default api;
