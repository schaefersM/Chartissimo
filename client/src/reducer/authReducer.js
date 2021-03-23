export default function authReducer (state, action) {

    const { type, payload } = action;
    
    switch (type) {
        case "login":
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
                readyToRender: true
            };
        case "logout":
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        case "toggleReadyToRender": 
            return {
                ...state,
                readyToRender: !state.readyToRender
            }
        default:
            break;
    }
};