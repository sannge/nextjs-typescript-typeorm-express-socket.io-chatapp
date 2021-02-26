import decode from "jwt-decode";

export const isValidTokens = (
	token: string | undefined,
	refreshToken: string | undefined
) => {
	if (token) {
		if (refreshToken) {
			const user: { username: string; iat: number; exp: number } = decode(
				refreshToken
			);
			if (user) {
				const { username, iat, exp } = user;
				if (Date.now() < exp * 1000) {
					//return true.The user is loggedIn, even if token expired, it can be refreshed in the server
					return username;
				}
			}
		}
	}
	return null;
};
