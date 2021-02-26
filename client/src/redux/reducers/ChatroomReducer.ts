import * as t from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
	chatrooms: [],
	loading: false,
	error: false,
};
const AuthReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case HYDRATE:
			const { chatrooms, loading, error } = action.payload.chatroom;
			if (loading) {
				return {
					...state,
					loading: action.payload.chatroom.loading,
				};
			} else if (error) {
				return {
					...state,
					error: action.payload.chatroom.error,
				};
			}
			return {
				...state,
				chatrooms: action.payload.chatroom.chatrooms,
			};

		case t.GET_CHATROOMS_LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case t.GET_CHATROOMS_ERRORS:
			return {
				...state,
				error: action.payload,
			};
		case t.GET_CHATROOMS:
			return {
				...state,
				chatrooms: action.payload,
			};

		default:
			return { ...state };
	}
};

export default AuthReducer;
