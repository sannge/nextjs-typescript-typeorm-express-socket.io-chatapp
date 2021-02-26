import { Response, Router } from "express";
import { Request } from "express";
import { User } from "../entities/User";
import { validate, isEmpty } from "class-validator";
import bcrypt from "bcrypt";
import { createTokens } from "../utils/auth";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import _ from "lodash";

import checkAuth from "../middleware/permission";

const register = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;

	try {
		let errors: any = {};
		const emailUser = await User.findOne({ email });
		const usernameUser = await User.findOne({ username });

		if (emailUser) {
			errors.email = "Email is already taken";
		}
		if (usernameUser) {
			errors.username = "Username is already taken";
		}

		if (username.includes("@")) {
			errors.username = "Username cannot include @";
		}

		if (username === "Admin") {
			errors.username = "Admin is a reserved name in the system.";
		}

		if (Object.keys(errors).length > 0) {
			let err: any = errors;
			return res.status(400).json({ err });
		}

		const user = new User({
			email,
			username,
			password,
		});
		errors = await validate(user);

		console.log(errors);
		if (errors.length > 0) {
			const err: any = {};
			errors.forEach((e: any) => {
				err[e.property] = e.constraints[Object.keys(e.constraints)[0]];
			});
			return res.status(400).json({ err });
		}

		await user.save();

		return res.json({ user });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err });
	}
};

const login = async (req: Request, res: Response) => {
	let err: any = {};

	const { email, password } = req.body;

	if (isEmpty(email)) err.email = "Email must not be empty";
	if (isEmpty(password)) err.password = "Password must not be empty";

	if (Object.keys(err).length > 0) {
		return res.status(400).json({ err });
	}

	try {
		const user = await User.findOne({ email: email });

		let err: any = {};
		if (!user) {
			err.email = "User is not found";
			return res.status(404).json({ err });
		}

		const passwordMatches = await bcrypt.compare(password, user.password);

		if (!passwordMatches) {
			err.password = "Invalid login";
			return res.status(401).json({ err });
		}

		const [token, refreshToken]: [string, string] = createTokens(
			user,
			process.env.SECRET,
			process.env.SECRET2
		);

		res.set("Set-Cookie", [
			cookie.serialize("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "development" ? false : true,
				sameSite: "strict",
				maxAge: 3600 * 24 * 7,
				path: "/",
			}),
			cookie.serialize("refreshToken", refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "development" ? false : true,
				sameSite: "strict",
				maxAge: 3600 * 24 * 7,
				path: "/",
			}),
		]);

		return res.status(200).json({ user });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ errors: "Something went wrong" });
	}
};

const me = async (_: Request, res: Response) => {
	return res.status(200).json(res.locals.user);
};

const logout = async (_: Request, res: Response) => {
	res.set("Set-Cookie", [
		cookie.serialize("token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "development" ? false : true,
			sameSite: "strict",
			expires: new Date(0),
			path: "/",
		}),
		cookie.serialize("refreshToken", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "development" ? false : true,
			sameSite: "strict",
			expires: new Date(0),
			path: "/",
		}),
	]);

	res.locals.user = null;
	return res.status(200).json({ success: true });
};

const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body;
	const { transporter } = res.locals;
	let user: User | undefined;

	user = await User.findOne({ email });

	if (user) {
		jwt.sign(
			{ user: _.pick(user, "id") },
			process.env.FORGOT_PASSWORD_SECRET!,
			{
				expiresIn: "1d",
			},
			(_, token) => {
				const url = `${process.env.CLIENT_URL}/change-password/${token}`;

				transporter.sendMail({
					to: email,
					subject: "0Day(XC) Forgot Password Confirmation Email",
					html: `Please click the link below to change your password: <a href="${url}">${url}</a>`,
				});
			}
		);
		return res.status(200).json({ success: true });
	} else {
		return res
			.status(400)
			.json({ email: "The email address is not registered" });
	}
};

const changePassword = async (req: Request, res: Response) => {
	const { password, confirmPassword } = req.body;
	try {
		const {
			user: { id },
		}: any = jwt.verify(req.params.token, process.env.FORGOT_PASSWORD_SECRET!);

		let err: any = {};
		if (password === "") {
			err.password = "Password cannot be empty";
		}
		if (confirmPassword === "") {
			err.confirmPassword = "Confirm Password cannot be empty";
		}

		if (password !== "" && password.length < 6) {
			err.password = "Password must be at least 6 characters long";
		}
		if (confirmPassword !== "" && confirmPassword.length < 6) {
			err.confirmPassword =
				"ConfirmPassworrd must be at least 6 characters long";
		}
		if (Object.keys(err).length > 0) {
			return res.status(400).json({ err });
		}

		if (password === confirmPassword) {
			const hasedPassword = await bcrypt.hash(password, 8);
			await User.update(id, { password: hasedPassword });
			return res.status(200).json({ success: true });
		} else {
			return res.status(400).json({
				confirmPassword: "Your confirm password must match the password field",
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ err: "Sorry, the token is expired!" });
	}
};

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", checkAuth, me);
router.get("/logout", checkAuth, logout);
router.post("/forgot-password", forgotPassword);
router.post("/change-password/:token", changePassword);

export default router;
