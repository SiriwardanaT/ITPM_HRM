import ins from '../Interceptors/axios'
import authHelper from './authHelpers'
const AuthAPI = {
        //login
        login : async (payload)=>{
            try{
                const response = await ins.post('auth/login',payload)
                authHelper.setCurruntUser(
                    response.data.token,
                    response.data.name,
                    response.data.jobRole,
                    response.data.isAdmin
                )
                return true;
            }
            catch(err){
                return false;
            }
           
        },
}

export default AuthAPI;