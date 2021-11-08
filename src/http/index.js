import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:5500/api',
    withCredentials:true
})

export const doLogin = data => api.post('/auth/login',data);
export const forgotPassword = data => api.post('/auth/forgot',data);
export const resetPassword = data => api.patch('/auth/reset',data);
export const dLogout = () => api.get('/auth/logout');
export const getCounts = () => api.get('/admin/counts');
export const getEmployees = () => api.get('/admin/employees');
export const getLeaders = () => api.get('/admin/leaders');
export const getAdmins = () => api.get('/admin/admins');
export const getTeams = () => api.get('/admin/teams');
export const getTeamMembers = data => api.get(`/admin/team/${data}/members`);
export const addUser = data => api.post('/admin/user',data);
export const updateUser = (id,data) => api.patch(`/admin/user/${id}`,data);
export const addTeam = data => api.post('/admin/team',data);
export const updateTeam = (id,data) => api.patch(`/admin/team/${id}`,data);
export const getEmployee = data => api.get(`/admin/employee/${data}`);
export const getTeam = data => api.get(`/admin/team/${data}`);
export const getUser = data => api.get(`/admin/user/${data}`);

export default api;