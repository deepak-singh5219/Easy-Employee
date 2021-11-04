import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:5500/api',
    withCredentials:true
})

export const doLogin = data => api.post('/auth/login',data);
export const forgotPassword = data => api.post('/auth/forgot',data);
export const resetPassword = data => api.patch('/auth/reset',data);

export default api;