import PropTypes from "prop-types";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const PrivateRoute = ({ render, props, ...rest }) => {
	const { isAuthenticated, readyToRenderAfterAuth } = useAuthStore();
	return (
		<div>
			{readyToRenderAfterAuth ? (
				<Route
					{...rest}
					render={(props) => {
						return isAuthenticated ? (
							render(props)
						) : (
							<Redirect to="/" />
						);
					}}
				/>
			) : (
				<h1>Proceeding...</h1>
			)}
		</div>
	);
};

PrivateRoute.propTypes = {
	props: PropTypes.object,
	render: PropTypes.func.isRequired,
};

export default PrivateRoute;
