import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PostCards from './PostCards';
import { Typography, Button } from '@material-ui/core';

export default function DisplayUser({ posts, setPosts }) {
	const { id } = useParams();

	const [userPosts, setUserPosts] = useState([]);
	useEffect(() => {
		axios.get(`http://localhost:5000/api/users/${id}/posts`).then((res) => {
			setUserPosts(res.data);
			console.log(res.data);
		});
	}, []);
	return (
		<React.Fragment>
			<Typography variant='h2' color='initial' align='center'>
				User Posts
			</Typography>
			{userPosts.map((post) => {
				return (
					<PostCards
						key={post.id}
						post={post.text}
						userName={post.postedBy}
						userPageCards
						posts={posts}
						setPosts={setPosts}
					/>
				);
			})}
			<Link to='/'>Go Home</Link>
		</React.Fragment>
	);
}
