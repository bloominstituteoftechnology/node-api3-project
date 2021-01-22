import axios from 'axios';
const baseURL="https://kavya-post.herokuapp.com";

function fetchPosts(id,setPosts){

axios.get(`${baseURL}/api/users/${id}/posts`)
.then(res=>{
    console.log('res in get posts:',res)
    setPosts(res.data)
})
.catch(err=>{
    console.log('error:',err.message)
})
}
export default fetchPosts;