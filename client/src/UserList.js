import React from 'react';
import {Card} from 'reactstrap';
import {Link} from 'react-router-dom';
import { CardTitle } from 'reactstrap';

function UserList({item}){
 
    return(
        <div>
           <Link className="newLink" to= {`/users/${item.id}`}> 
            <Card className="user">
                <CardTitle>{item.name}</CardTitle>
            </Card> 
            </Link>
        </div>        
    )

}
export default UserList;