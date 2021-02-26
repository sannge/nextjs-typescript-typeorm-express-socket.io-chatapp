import * as t from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
	username: null,
	logoutLoading: false,
	logoutError: null,
};
const AuthReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				username: action.payload.auth.username,
			};

		case t.HYDRATE_USER:
			return {
				...state,
				username: action.payload,
			};
		case t.LOGOUT_LOADING:
			return {
				...state,
				logoutLoading: action.payload,
			};
		case t.LOGOUT_USER:
			return {
				...state,
				username: null,
			};
		case t.LOGOUT_ERROR:
			return {
				...state,
				logoutError: action.payload,
			};
		default:
			return { ...state };
	}
};

export default AuthReducer;
