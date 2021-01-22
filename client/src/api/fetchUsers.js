import axios from 'axios';
const baseURL="https://kavya-post.herokuapp.com";

function fetchUsers(setUsers){

axios.get(`${baseURL}/api/users/`)
.then(res=>{
    console.log('res in get users:',res)
    setUsers(res.data)
})
.catch(err=>{
    console.log('error:',err.message)
})
}
export default fetchUsers;