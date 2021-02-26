import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const createTokens = (
	user: User,
	secret: any,
	secret2: any
): [string, string] => {
	const username = user.username;
	const createToken = jwt.sign(
		{
			username,
		},
		secret,
		{
			expiresIn: "20m",
		}
	);
	const createRefreshToken = jwt.sign(
		{
			username,
		},
		user.password + secret2,
		{
			expiresIn: "7d",
		}
	);

	return [createToken, createRefreshToken];
};

export const refreshTokens = async (
	_: string,
	refreshToken: string,
	User: any,
	SECRET: any,
	SECRET2: any
) => {
	let username: string | null = null;
	try {
		const decoded = jwt.decode(refreshToken);
		username = (decoded as any).username;
	} catch (err) {
		return {};
	}

	if (!username) {
		return {};
	}

	// //{raw: true} so that we only get user object, not sequelize object that can be used to do operations
	const user = await User.findOne({ username });

	if (!user) {
		return {};
	}
	const refreshSecret = user.password + SECRET2;

	try {
		//make sure to use user.password+SECRET2 for secret
		jwt.verify(refreshToken, refreshSecret);
	} catch (err) {
		return {};
	}

	const [newToken, newRefreshToken] = createTokens(user, SECRET, SECRET2);

	return {
		user: user,
		token: newToken,
		refreshToken: newRefreshToken,
	};
};
