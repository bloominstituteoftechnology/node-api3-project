import React from 'react';
import axios from 'axios';
import User from './User';

export default class UsersList extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/users")
        .then(res => {
            console.log(res.data);
            this.setState({ users: res.data});
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {this.state.users.map(user => (
                    <UserDetails key={user.id} user={user} />
                ))}
            </div>
        )
    }
}

function UserDetails({ user }) {
    return (
        <User user={user} />
    )
}