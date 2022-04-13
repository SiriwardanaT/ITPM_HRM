import ins from '../Interceptors/axios'

const UserAPI = {

    addEmployee: async (payload)=>{
        try{
            const res = await ins.post('user/add',payload);
            console.log(res.status)
            return res.status == 201 ?true:false
        }
        catch(err){
            return false;
        }
    },
    getAllEmployees : async ()=>{
        try{
            const res = await ins.get('user')
            return res.data;
        }
        catch(err){
            return null;
        }
    }

}
export default UserAPI