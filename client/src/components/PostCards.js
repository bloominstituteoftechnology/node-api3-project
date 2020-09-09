import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
	makeStyles,
} from '@material-ui/core';
import PostForm from './PostForm';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
	root: {
		width: '50%',
		margin: '0 auto 15px ',
		'&:first-child': {
			marginTop: '25px',
		},
	},
	title: {
		fontSize: 22,
	},
});

export default function PostCards({
	userName,
	post,
	id,
	userPosts,
	setUserPosts,
	userPageCards,
	allPosts,
}) {
	const classes = useStyles();
	const history = useHistory();
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleEdit = () => {
		setDialogOpen(true);
		console.log(post);
	};

	const handleDelete = () => {
		axios.delete(`http://localhost:5000/api/posts/${id}`).then((res) => {
			const deleted = userPosts.filter((post) => post.id !== res.data.id);
			setUserPosts(deleted);
		});
	};

	const handleAddComment = () => {};

	return (
		<Card
			className={classes.root}
			variant='outlined'
			// onClick={() => history.push(`/user/${props.id}`)}
		>
			<CardContent>
				<Typography
					className={classes.title}
					color='textSecondary'
					gutterBottom
				>
					{userName}
				</Typography>
				<Typography variant='body2' component='p'>
					{post}
				</Typography>
			</CardContent>
			<CardActions>
				{userPageCards && (
					<React.Fragment>
						<Button onClick={handleEdit}>Edit Post</Button>
						<Button onClick={handleDelete}>Delete Post</Button>
						<Dialog
							open={dialogOpen}
							onClose={() => setDialogOpen(false)}
							aria-labelledby='Add New Post'
						>
							<DialogTitle id='posts'>Add New Post</DialogTitle>
							<DialogContent>
								<PostForm
									post={post}
									userPosts={userPosts}
									setUserPosts={setUserPosts}
									setDialogOpen={setDialogOpen}
									edit={true}
									id={id}
									userName={userName}
								/>
							</DialogContent>
						</Dialog>
					</React.Fragment>
				)}
				{allPosts && (
					<React.Fragment>
						<Button onClick={handleAddComment}>Add Comment</Button>
					</React.Fragment>
				)}
			</CardActions>
		</Card>
	);
}
