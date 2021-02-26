import * as t from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
	messages: [],
};
const AuthReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				messages: [],
			};
		case t.SET_MESSAGES:
			return {
				...state,
				messages: [...state.messages, action.payload],
			};
		default:
			return { ...state };
	}
};

export default AuthReducer;
