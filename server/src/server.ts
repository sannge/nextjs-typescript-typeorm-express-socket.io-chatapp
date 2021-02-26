import "reflect-metadata";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
dotenv.config();
import trim from "./middleware/trim";
import cookieParser from "cookie-parser";
import authMiddleWare from "./middleware/auth";

import authRoutes from "./routes/auth";
import chatroomRoutes from "./routes/chatroom";
import previewLinkRoutes from "./routes/preview-link";

import cors from "cors";
import { socketHandler } from "./sockets";

import transporter from "./middleware/transporter";

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
	cors: {
		origin: process.env.CORS_ORIGIN,
		credentials: true,
		optionsSuccessStatus: 200,
	},
});

const PORT = process.env.PORT || 5000;

//web sockets handler
socketHandler(io);

app.use(express.json());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
		optionsSuccessStatus: 200,
	})
);
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(morgan("dev"));

app.use(trim);
app.use(transporter);
app.use(authMiddleWare);

app.get("/", (_, res) => res.send("hello world"));
app.use("/api/auth", authRoutes);
app.use("/api/chatrooms", chatroomRoutes);
app.use("/api/preview-link", previewLinkRoutes);

http.listen(PORT, async () => {
	console.log("Server running at http://localhost:", PORT);
	try {
		await createConnection();
		console.log("Database Connected.");
		//for testing refreshTokens method

		// refreshTokens(
		// 	"1",
		// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2MTMxMTM0NzEsImV4cCI6MTYxMzcxODI3MX0.f9mpsi_ZuvSg_iZMEt0Bc0YEJYjBGs88xZEkneM0BCY",
		// 	User,
		// 	process.env.SECRET,
		// 	process.env.SECRET2
		// );
	} catch (err) {
		console.log(err);
	}
});
