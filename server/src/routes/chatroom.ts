import { Response, Router } from "express";
import { Request } from "express";

import checkAuth from "../middleware/permission";
import { Chatroom } from "../entities/Chatroom";
import { validate } from "class-validator";

const createChatroom = async (req: Request, res: Response) => {
	const { name } = req.body;
	if (name.trim() === "") {
		return res
			.status(400)
			.json({ err: { name: "Chatroom name cannot be empty" } });
	}

	try {
		let errors: any = {};
		const chatroomName = await Chatroom.findOne({ name });

		if (chatroomName) {
			errors.name = "This chatroom name is already taken";
		}

		if (Object.keys(errors).length > 0) {
			let err: any = errors;
			return res.status(400).json({ err });
		}

		const chatroom = new Chatroom({
			name,
		});
		errors = await validate(chatroom);
		if (errors.length > 0) {
			const err: any = {};
			errors.forEach((e: any) => {
				err[e.property] = e.constraints[Object.keys(e.constraints)[0]];
			});
			return res.status(400).json({ err });
		}

		await chatroom.save();

		return res.status(201).json({ chatroom });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err });
	}
};

const getChatRooms = async (_: Request, res: Response) => {
	try {
		const chatrooms = await Chatroom.find({ order: { createdAt: "DESC" } });
		return res.status(200).json({ chatrooms });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ err: "Something went wrong. Please try again later." });
	}
};

const getChatRoom = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const chatroom = await Chatroom.findOneOrFail(id);
		return res.status(200).json({ chatroom });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ err: "This specific Chat Room does not exist!" });
	}
};

const router = Router();
router.post("/create-chatroom", checkAuth, createChatroom);
router.get("/", checkAuth, getChatRooms);
router.get("/:id", checkAuth, getChatRoom);

export default router;
