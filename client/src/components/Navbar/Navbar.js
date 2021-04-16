import { Link } from "react-router-dom";
import React from "react";
import routes from "./routes";
import { useAuthStore } from "../../stores/authStore";

const Navbar = () => {
	const { isAuthenticated, readyToRenderAfterAuth } = useAuthStore();

	const AuthOnlyRoutes = routes.map(
		({ authenticationRequired, name, needed, path }, i) => {
			return authenticationRequired || needed ? (
				<li key={i} className="navbar-brand">
					<Link
						className="text-light navbar-brand font-weight-bold font-fantasy"
						to={path}
					>
						{name}
					</Link>
				</li>
			) : null;
		}
	);

	const NeededRoutes = routes.map(({ name, needed, path }, i) => {
		return needed ? (
			<li key={i} className="navbar-brand">
				<Link
					className="text-light navbar-brand font-weight-bold font-fantasy"
					to={path}
				>
					{name}
				</Link>
			</li>
		) : null;
	});

	const PublicRoutes = routes.map(
		({ authenticationRequired, name, needed, path }, i) => {
			return !authenticationRequired || needed ? (
				<li key={i} className="navbar-brand">
					<Link
						className="text-light navbar-brand font-weight-bold font-fantasy"
						to={path}
					>
						{name}
					</Link>
				</li>
			) : null;
		}
	);

	return (
		<div className="sticky-top">
			{readyToRenderAfterAuth && isAuthenticated ? (
				<ul className="navbar navbar-expand-lg bg-success sticky-top">
					{AuthOnlyRoutes}
				</ul>
			) : readyToRenderAfterAuth && !isAuthenticated ? (
				<ul className="navbar navbar-expand-lg bg-success sticky-top">
					{PublicRoutes}
				</ul>
			) : (
				<ul className="navbar navbar-expand-lg bg-success sticky-top">
					{NeededRoutes}
				</ul>
			)}
		</div>
	);
};

export default Navbar;
