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
                    response.data.isAdmin,
                    response.data.profile_img
                )
                return true;
            }
            catch(err){
                return false;
            }
           
        },
        IsAuthenticated :()=>{
                return authHelper.getToken() != null ? true:false
        }
}

export default AuthAPI;