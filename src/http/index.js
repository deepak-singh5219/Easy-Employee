import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL:'http://localhost:5500/api',
    withCredentials:true
})

//Auth
export const doLogin = data => api.post('/auth/login',data);
export const forgotPassword = data => api.post('/auth/forgot',data);
export const resetPassword = data => api.patch('/auth/reset',data);
export const dLogout = () => api.get('/auth/logout');

//Admin
export const getCounts = () => api.get('/admin/counts');
export const getEmployees = () => api.get('/admin/employees');
export const getLeaders = () => api.get('/admin/leaders');
export const getFreeLeaders = () => api.get('/admin/leaders/free');
export const getAdmins = () => api.get('/admin/admins');
export const getTeams = () => api.get('/admin/teams');
export const getTeamMembers = data => api.get(`/admin/team/${data}/members`);
export const addUser = data => api.post('/admin/user',data);
export const updateUser = (id,data) => api.patch(`/admin/user/${id}`,data);
export const addTeam = data => api.post('/admin/team',data);
export const updateTeam = (id,data) => api.patch(`/admin/team/${id}`,data);
export const getEmployee = data => api.get(`/admin/employee/${data}`);
export const getFreeEmployees = () => api.get('/admin/employees/free');
export const getTeam = data => api.get(`/admin/team/${data}`);
export const removeMember = data => api.patch('/admin/team/member/remove',data);
export const addMember = data => api.patch('/admin/team/member/add',data);
export const removeLeader = data => api.patch('/admin/team/leader/remove',data);
export const addLeader = data => api.patch('/admin/team/leader/add',data);
export const getUser = data => api.get(`/admin/user/${data}`);
//Leader
export const getMembers_Leader = () => api.get('/leader/team/members');
export const getTeam_Leader = () => api.get('/leader/team/');

api.interceptors.response.use((response)=>{
    return response.data;
},(error)=>{
    console.log(error.response.data);
    toast.error(error.response.data.message)
    return error.response.data;
})

export default api;