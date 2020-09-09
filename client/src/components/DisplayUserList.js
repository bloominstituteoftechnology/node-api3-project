import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, makeStyles, Typography } from '@material-ui/core';

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
export default function DisplayUserList(props) {
	const [users, setUsers] = useState([]);
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
	}, []);
	return (
		<React.Fragment>
			<Typography variant='h1' color='initial' align='center'>
				Users
			</Typography>
			<Grid container className={classes.container}>
				{users.map((user) => {
					return (
						<Grid item>
							<Link to={`/user/${user.id}`} className={classes.link}>
								{user.name}
							</Link>
						</Grid>
					);
				})}
			</Grid>
		</React.Fragment>
	);
}
