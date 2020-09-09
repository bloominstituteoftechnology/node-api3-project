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
	posts,
	setPosts,
	userPageCards,
	allPosts,
}) {
	const classes = useStyles();
	const history = useHistory();
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleEdit = () => {};

	const handleDelete = () => {};

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
					</React.Fragment>
				)}
				{allPosts && (
					<React.Fragment>
						<Button onClick={handleAddComment}>Add Comment</Button>
					</React.Fragment>
				)}
			</CardActions>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				aria-labelledby='Add New Post'
			>
				<DialogTitle id='posts'>Add New Post</DialogTitle>
				<DialogContent>
					<PostForm
						postData={post}
						setPostData={setPosts}
						setDialogOpen={setDialogOpen}
						edit={false}
					/>
				</DialogContent>
			</Dialog>
		</Card>
	);
}
