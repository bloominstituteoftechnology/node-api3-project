import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import DisplayPosts from './components/DisplayPosts';
import { Route, Switch } from 'react-router-dom';
import DisplayUser from './components/DisplayUser';
import DisplayUserList from './components/DisplayUserList';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	},
});
function App() {
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<Switch>
				<Route exact path='/'>
					<DisplayUserList reload />
					<DisplayPosts />
				</Route>
				<Route path='/user/:id'>
					<DisplayUserList />
					<DisplayUser />
				</Route>
			</Switch>
		</Container>
	);
}

export default App;
