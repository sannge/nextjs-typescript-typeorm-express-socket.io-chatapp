import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { refreshTokens } from "../utils/auth";
import cookie from "cookie";

export default async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.token;
	console.log("TOKEN: ", token);
	if (token) {
		try {
			const { username }: any = jwt.verify(token, process.env.SECRET!);
			const user = await User.findOne({ username });
			res.locals.user = user;
		} catch (err) {
			const refreshToken = req.cookies.refreshToken;
			const newTokens = await refreshTokens(
				token,
				refreshToken,
				User,
				process.env.SECRET,
				process.env.SECRET2
			);

			if (newTokens.token && newTokens.refreshToken) {
				res.set("Set-Cookie", [
					cookie.serialize("token", newTokens.token, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "development" ? false : true,
						sameSite: "strict",
						maxAge: 3600 * 24 * 7,
						path: "/",
					}),
					cookie.serialize("refreshToken", newTokens.refreshToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "development" ? false : true,
						sameSite: "strict",
						maxAge: 3600 * 24 * 7,
						path: "/",
					}),
				]);
				console.log("Refreshed Tokens!");

				res.locals.user = newTokens.user;
			}
		}
	}
	return next();
};
