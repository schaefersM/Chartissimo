export default function authReducer(state, action) {
	const { payload, type } = action;

	switch (type) {
		case "logout":
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		case "userAuthenticated":
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
				readyToRenderAfterAuth: true,
			};
		case "userNotAuthenticated":
			return {
				...state,
				readyToRenderAfterAuth: true,
			};
		default:
			break;
	}
}
