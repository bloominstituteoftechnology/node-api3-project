import React from 'react';

const User = props => {
    const {name} = props.user;

    return (
        <div>
            <p>{name}</p>
        </div>
    )
}
export default User;