import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import DisplayPosts from './components/DisplayPosts';
import { Route, Switch } from 'react-router-dom';
import DisplayUser from './components/DisplayUser';
import DisplayUserList from './components/DisplayUserList';
import axios from 'axios';

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:5000/api/posts')
			.then((res) => {
				console.log(res.data);
				setPosts(res.data);
			})
			.catch((err) => {
				alert(err);
			});
	}, []);
	return (
		<Container textAlign='center'>
			<Switch>
				<Route exact path='/'>
					<DisplayUserList />
					<DisplayPosts posts={posts} setPosts={setPosts} />
				</Route>
				<Route path='/user/:id'>
					<DisplayUser posts={posts} setPosts={setPosts} />
				</Route>
			</Switch>
		</Container>
	);
}

export default App;
