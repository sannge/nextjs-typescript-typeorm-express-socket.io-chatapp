import * as t from "../types";
import axios from "../../utils/axios";
import { NextPageContext } from "next";

const chatroomsLoading = (dispatch, payload: boolean) => {
	dispatch({
		type: t.GET_CHATROOMS_ERRORS,
		payload,
	});
};

const chatroomsError = (dispatch, payload: boolean) => {
	dispatch({
		type: t.GET_CHATROOMS_ERRORS,
		payload,
	});
};

export const fetchChatrooms = (ctx: NextPageContext) => async (
	dispatch: any
) => {
	chatroomsError(dispatch, false);

	chatroomsLoading(dispatch, true);

	try {
		const response = await axios.get("/api/chatrooms", {
			headers: ctx.req?.headers,
		});

		if (response.data.chatrooms) {
			chatroomsLoading(dispatch, false);
			dispatch({
				type: t.GET_CHATROOMS,
				payload: response.data.chatrooms,
			});
		}
	} catch (err) {
		chatroomsLoading(dispatch, false);
		chatroomsError(dispatch, true);
	}
};
