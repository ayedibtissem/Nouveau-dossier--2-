import axios from 'axios'
const UserService= {}
UserService.register=function(data){
return axios.post('http://localhost:3005/users/signup',data)
}
UserService.signin=function(data){
    return axios.post('http://localhost:3005/users/signin',data)
    }
    

export default UserService;