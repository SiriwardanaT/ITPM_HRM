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
    },
    getEmployeeById : async (id)=>{
        try{
            const res = await ins.get('user/'+id);
            return res.status == 200 ? res.data:null
        }
        catch(err){
            return null;
        }
    },
    
    getUserProfile : async () =>{
        try{
            const res = await ins.get('user/profile/my');
            return res.data;
        }
        catch(err){
            console.log("err"+err);
            return null;
        }
    },
    
    updateEmployee : async (payload, id) =>{
         try{
            const res = await ins.put('user/'+id,payload);
            return res.status == 200 ? true :false
         }
         catch(err){
            return false;
         }
    }

}
export default UserAPI