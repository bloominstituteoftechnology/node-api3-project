import axios from 'axios';

function fetchUsers(setUsers){

axios.get('http://localhost:4000/api/users/')
.then(res=>{
    console.log('res in get users:',res)
    setUsers(res.data)
})
.catch(err=>{
    console.log('error:',err.message)
})
}
export default fetchUsers;