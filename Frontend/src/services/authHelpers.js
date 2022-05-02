const AuthHelpers = {
    setCurruntUser(token,username,jobrole,isAdmin,profile_img){
        localStorage.setItem('token',token)
        localStorage.setItem('username',username)
        localStorage.setItem('jobrole',jobrole)
        localStorage.setItem('isAdmin',isAdmin)
        localStorage.setItem('profile_img',profile_img)
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
    getUserProfileImage(){
        return localStorage.getItem('profile_img');
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