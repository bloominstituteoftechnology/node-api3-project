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

export default function Form({ setDialogOpen, users, setUsers }) {
	const { handleSubmit, register, errors, formState } = useForm({
		mode: 'onChange',
	});
	const classes = useStyles();

	const addUser = (data) => {
		axios
			.post(`http://localhost:5000/api/users/`, data)
			.then((res) => {
				setUsers([...users, res.data]);

				setDialogOpen(false);
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
			onSubmit={handleSubmit(addUser)}
			className={classes.container}
		>
			<TextField
				fullWidth={true}
				className={classes.field}
				autoFocus
				variant='outlined'
				type='text'
				id='name'
				name='name'
				inputRef={register({ required: 'Required' })}
				label='Name:'
				error={errors.name ? true : false}
				helperText={errors.name ? errors.name.message : null}
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
