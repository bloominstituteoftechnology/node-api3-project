import React, {useEffect, useState} from 'react';
import './App.css';
import axios, {AxiosResponse} from "axios";

function App() {
    const [users, setUsers] = useState<AxiosResponse<any[]>>();
    useEffect(() => {
        axios.get(`http://localhost:4000/api/users/`)
            .then((usersList: AxiosResponse<any[]>) => {
                console.log(usersList);
                setUsers(usersList);
            })
    }, []);

    return (
        <div className="App">
            working
        </div>
    );
}

export default App;
