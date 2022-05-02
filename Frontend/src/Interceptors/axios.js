import axios from 'axios';
import authHelper from '../services/authHelpers'
const ins = axios.create({
    baseURL:'http://localhost:5000/'
});

ins.interceptors.request.use(config =>{
    console.log(config)
    config.headers.Authorization = authHelper.getToken();
    return config
},err =>{
    return Promise.reject(err)
})

ins.interceptors.response.use(res=>{
    return res;
},err =>{
    return Promise.reject(err)
})


export default ins
