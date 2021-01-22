import React from 'react';
import {Card, CardTitle } from 'reactstrap';

function PostList({item}){
 
    return(
        <div>
            <Card className="user">
                <CardTitle>{item.text}</CardTitle>
            </Card> 
        </div>        
    )

}
export default PostList;