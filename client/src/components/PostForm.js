import React from 'react';
import {
	TextField,
	Button,
	Box,
	makeStyles,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const useStyles = makeStyles({
	container: {
		padding: '10%',
	},
	field: {
		margin: '20px auto',
	},
	heading: {
		textAlign: 'center',
	},
});

export default function Form(props) {
	const { handleSubmit, register, errors, formState } = useForm({
		mode: 'onChange',
	});
	const classes = useStyles();

	const submitAdd = (data) => {
		axios
			.post('http://localhost:5000/api/posts', data)
			.then((res) => {
				console.log(res.data);
				props.setPostData([...props.postData, res.data]);
				props.setDialogOpen(false);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	const submitEdit = (data) => {
		axios
			.put(`http://localhost:5000/api/posts/${props.id}`, data)
			.then((res) => {
				res.data.postedBy = props.userName;
				const updated = props.userPosts.map((post) => {
					if (post.id === res.data.id) {
						return res.data;
					} else {
						return post;
					}
				});
				props.setUserPosts(updated);
				props.setDialogOpen(false);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	if (formState.isSubmitting) {
		return (
			<Box className={classes.container}>
				<Typography>Loading...</Typography>
				<CircularProgress color='secondary' />
			</Box>
		);
	}

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(props.edit ? submitEdit : submitAdd)}
			className={classes.container}
		>
			<TextField
				fullWidth={true}
				className={classes.field}
				autoFocus
				variant='outlined'
				type='text'
				id='text'
				name='text'
				inputRef={register({ required: 'Required' })}
				defaultValue={props.post ? props.post : ''}
				label='Post:'
				error={errors.text ? true : false}
				helperText={errors.text ? errors.text.message : null}
			/>

			<Button
				fullWidth
				variant='contained'
				color='primary'
				size='large'
				type='submit'
				disabled={!formState.isValid}
			>
				Submit
			</Button>
		</Box>
	);
}
