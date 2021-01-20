import axios from 'axios';

function fetchPosts(id,setPosts){

axios.get(`http://localhost:4000/api/users/${id}/posts`)
.then(res=>{
    console.log('res in get posts:',res)
    setPosts(res.data)
})
.catch(err=>{
    console.log('error:',err.message)
})
}
export default fetchPosts;