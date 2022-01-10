import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => (auth === true
				? <Component {...props} />
				: <Redirect to={{ pathname: process.env.REACT_APP_BASENAME, state: { from: props.location } }} />)} />
	)
}

export default PrivateRoute
