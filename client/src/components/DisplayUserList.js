import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddUserForm from './AddUserForm';
import { Link } from 'react-router-dom';
import {
	Grid,
	makeStyles,
	Typography,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
} from '@material-ui/core';

const useStyles = makeStyles({
	link: {
		textDecoration: 'none',
		fontSize: '18px',
	},
	container: {
		display: 'flex',
		justifyContent: 'space-evenly',
		marginBottom: '40px',
	},
	item: {},
});
export default function DisplayUserList({ reload }) {
	const [users, setUsers] = useState([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const classes = useStyles();
	useEffect(() => {
		axios
			.get('http://localhost:5000/api/users')
			.then((res) => {
				setUsers(res.data);
			})
			.catch((err) => {
				alert(err);
			});
	}, [reload]);
	return (
		<React.Fragment>
			<Typography variant='h1' color='initial' align='center'>
				Users
			</Typography>
			<Button
				variant='outlined'
				color='primary'
				onClick={() => setDialogOpen(true)}
			>
				Add User
			</Button>
			<Grid container className={classes.container}>
				{users.map((user) => {
					return (
						<Grid item key={user.id}>
							<Link to={`/user/${user.id}`} className={classes.link}>
								{user.name}
							</Link>
						</Grid>
					);
				})}
			</Grid>

			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				aria-labelledby='Add User'
			>
				<DialogTitle id='users'>Create User</DialogTitle>
				<DialogContent>
					<AddUserForm
						setDialogOpen={setDialogOpen}
						users={users}
						setUsers={setUsers}
					/>
				</DialogContent>
			</Dialog>
		</React.Fragment>
	);
}
