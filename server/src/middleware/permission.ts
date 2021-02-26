import { Request, Response, NextFunction } from "express";

interface UserType {
	username: string;
	password: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	occupation: string;
	education: string;
	country: string;
}
interface RequestWithUser extends Request {
	user?: UserType;
}

const checkAuth = async (
	_: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	try {
		if (res.locals.user) {
			return next();
		} else {
			throw new Error("Unauthenticated");
		}
	} catch (err) {
		console.log("Error from checkAuth catch::: ", err);
		return res.status(401).json({ error: err.message });
	}
};

export default checkAuth;
