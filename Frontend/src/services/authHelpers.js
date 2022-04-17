const AuthHelpers = {
    setCurruntUser(token,username,jobrole,isAdmin){
        localStorage.setItem('token',token)
        localStorage.setItem('username',username)
        localStorage.setItem('jobrole',jobrole)
        localStorage.setItem('isAdmin',isAdmin)
    },
    getToken(){
        return localStorage.getItem('token');
    },
    getUsername(){
        return localStorage.getItem('username');
    },
    getJobRole(){
        return localStorage.getItem('jobrole');
    },
    getAdminStatus(){
        return localStorage.getItem('isAdmin');
    },
    logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('jobrole')
        localStorage.removeItem('isAdmin')

        return true;
    }

}
export default AuthHelpers;