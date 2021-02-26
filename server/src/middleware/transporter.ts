import { Response, Request, NextFunction } from "express";
import nodemailer from "nodemailer";

export default async (_: Request, res: Response, next: NextFunction) => {
	// const testAccount = await nodemailer.createTestAccount();
	// console.log(testAccount);
	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, //true for 465, false for other ports
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASSWORD,
		},
	});
	res.locals.transporter = transporter;
	next();
};
