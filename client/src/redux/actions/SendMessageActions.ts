import * as t from "../types";

export const setMessages = (message: { user: string; text: string }) => (
	dispatch: any
) => {
	return dispatch({
		type: t.SET_MESSAGES,
		payload: message,
	});
};
