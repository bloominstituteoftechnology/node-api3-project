import React from 'react';
 
import {Button} from 'reactstrap';
import fetchUsers from './api/fetchUsers';
import UserList from './UserList';

function Home({users,setUsers}){

    const getUserList=()=>{
        fetchUsers(setUsers);
    }
    return(
        <div>
            {users.length === 0 ? <Button className="m-4 p-4" color="info"
            onClick={getUserList}>Looking for UserList?</Button> : 
            <div className="userList">
            <h3> Here are the users! </h3>
             {users.map(item=> {
                 return <UserList key= {item.id} item={item} />
             })}
             </div>
             }
        </div>
    )

}
export default Home;