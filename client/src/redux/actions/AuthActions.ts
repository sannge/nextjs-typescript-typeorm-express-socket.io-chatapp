import * as t from "../types";
import axios from "../../utils/axios";

export const hydrateUser = (user: string) => (dispatch: any) => {
	return dispatch({
		type: t.HYDRATE_USER,
		payload: user,
	});
};

const logoutLoading = (dispatch, payload: boolean) => {
	dispatch({
		type: t.LOGOUT_LOADING,
		payload,
	});
};

const logoutError = (dispatch, payload: string | null) => {
	dispatch({
		type: t.LOGOUT_ERROR,
		payload,
	});
};

export const logout = () => async (dispatch) => {
	logoutError(dispatch, null);
	logoutLoading(dispatch, true);
	try {
		const response = await axios.get("/api/auth/logout");
		logoutLoading(dispatch, false);
		if (response.data.success) {
			dispatch({
				type: t.LOGOUT_USER,
			});
		}
	} catch (err) {
		logoutLoading(dispatch, false);
		logoutError(dispatch, "Occured an error while logging out.");
	}
};
