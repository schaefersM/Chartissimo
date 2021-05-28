import "bootstrap/dist/css/bootstrap.css";
import "./styles/App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import Browse from "./components/Browse/Browse";
import { BrowseProvider } from "./stores/chartStore";
import ChartPage from "./components/ChartPage/ChartPage";
import Gallery from "./components/Gallery/Gallery";
import { LoginPage, Logout, Register } from "./components/Auth";
import Navbar from "./components/Navbar/Navbar";
import NotFoundPage from "./components/NotFoundPage";
import PrivateRoute from "./components/Navbar/privateRoute";
import PublicOnlyRoute from "./components/Navbar/publicOnlyRoute";
import { useAuthStore, useAuthDispatch } from "./stores/authStore";

const App = () => {
	const authDispatch = useAuthDispatch();
	const { user } = useAuthStore();

	console.log(user ? user : "No user logged in.");

	useEffect(() => {
		const refreshAuthorization = async () => {
			const options = {
				credentials: "include",
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			};
			const response = await fetch(
				`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_AUTH_PORT}/auth/refresh`,
				options
			);
			if (!response.ok) {
				authDispatch({
					type: "userNotAuthenticated",
				});
			} else {
				authDispatch({
					type: "userAuthenticated",
					payload: await response.json(),
				});
			}
		};
		try {
			refreshAuthorization();
		} catch (e) {
			console.log(e);
		}
	}, [authDispatch]);

	return (
		<Router>
			<Navbar />
			<Switch>
				<Route
					path="/"
					exact
					render={(props) => (
						<BrowseProvider>
							<Browse {...props} />
						</BrowseProvider>
					)}
				/>
				<PublicOnlyRoute
					path="/login"
					exact
					render={(props) => <LoginPage {...props} />}
				/>
				<PublicOnlyRoute
					path="/register"
					exact
					render={(props) => <Register {...props} />}
				/>
				<PrivateRoute
					path="/logout"
					exact
					render={(props) => <Logout {...props} />}
				/>
				<PrivateRoute
					path="/gallery"
					exact
					render={(props) => <Gallery {...props} />}
				/>
				<PrivateRoute
					path="/chart/:chartId"
					exact
					render={(props) => (
						<BrowseProvider>
							<ChartPage {...props} />
						</BrowseProvider>
					)}
				/>
				<Route
					path="/404"
					exact
					render={(props) => <NotFoundPage {...props} />}
				/>
			</Switch>
		</Router>
	);
};

export default App;
