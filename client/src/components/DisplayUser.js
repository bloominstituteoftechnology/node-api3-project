import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';
import PostCards from './PostCards';
import PostForm from './PostForm';
import {
	Typography,
	Button,
	makeStyles,
	Dialog,
	DialogTitle,
	DialogContent,
} from '@material-ui/core';

const useStyles = makeStyles({
	addPost: {
		marginBottom: '20px',
	},
	buttons: {
		display: 'flex',
		justifyContent: 'center',
		width: '40%',
		marginBottom: '20px',
	},
});
export default function DisplayUser() {
	const { id } = useParams();
	const classes = useStyles();
	const [userPosts, setUserPosts] = useState([]);
	const [adding, setAdding] = useState(false);
	const [userName, setUsername] = useState('');
	const history = useHistory();

	useEffect(() => {
		axios.get(`http://localhost:5000/api/users/${id}/posts`).then((res) => {
			setUserPosts(res.data);
		});
		axios.get(`http://localhost:5000/api/users/${id}`).then((res) => {
			// console.log(res.data);
			setUsername(res.data.name);
		});
	}, [id]);

	const handleAddPost = () => {
		setAdding(true);
	};

	const handleDelete = () => {
		axios.delete(`http://localhost:5000/api/users/${id}`).then((res) => {
			console.log(res.data);
			history.push('/');
		});
		console.log('delete');
	};

	return (
		<React.Fragment>
			<Typography variant='h2' color='initial' align='center'>
				User Info for {userName}
			</Typography>
			<Button
				variant='contained'
				color='primary'
				onClick={handleAddPost}
				className={classes.addPost}
			>
				Add Post
			</Button>
			{userPosts.map((post) => {
				return (
					<PostCards
						key={post.id}
						post={post.text}
						userName={post.postedBy}
						userPageCards
						userPosts={userPosts}
						setUserPosts={setUserPosts}
						id={post.id}
					/>
				);
			})}
			<Dialog
				open={adding}
				onClose={() => setAdding(false)}
				aria-labelledby='Add New Post'
			>
				<DialogTitle id='posts'>Add New Post</DialogTitle>
				<DialogContent>
					<PostForm
						// post={post}
						userPosts={userPosts}
						setUserPosts={setUserPosts}
						setDialogOpen={setAdding}
						edit={false}
						id={id}
						userName={userName}
					/>
				</DialogContent>
			</Dialog>
			<div className={classes.buttons}>
				{/* <Button variant='contained' color='secondary'>
					Edit Username
				</Button> */}

				<Button variant='contained' color='secondary' onClick={handleDelete}>
					Delete User
				</Button>
			</div>
			<Link to='/'>Go Home</Link>
		</React.Fragment>
	);
}
