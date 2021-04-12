import { AuthReducer } from "../reducer";
import { AuthState } from "../providerStates";
import makeStore from "./makeStore";

const [AuthProvider, useAuthDispatch, useAuthStore] = makeStore(
	AuthReducer,
	AuthState
);

export { AuthProvider, useAuthDispatch, useAuthStore };
