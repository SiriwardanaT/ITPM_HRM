import axios from 'axios';

const ins = axios.create({
    baseURL:'http://localhost:5000/'
});

ins.interceptors.request.use(config =>{
    console.log(config)
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
