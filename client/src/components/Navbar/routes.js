const routes = [
	{
		name: "Browse",
		path: "/",
		authenticationRequired: false,
		needed: true,
	},
	{
		name: "Login",
		path: "/login",
		authenticationRequired: false,
	},
	{
		name: "Logout",
		path: "/logout",
		authenticationRequired: true,
	},
	{
		name: "Gallery",
		path: "/gallery",
		authenticationRequired: true,
	},
	{
		name: "Register",
		path: "/register",
		authenticationRequired: false,
	},
];

export default routes;
