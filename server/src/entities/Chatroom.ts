import { Length } from "class-validator";
import { Column, Entity as TOEntity } from "typeorm";
import Entity from "./Entity";

@TOEntity("chatrooms")
export class Chatroom extends Entity {
	constructor(chatroom: Partial<Chatroom>) {
		super();
		Object.assign(this, chatroom);
	}

	@Length(3, 25, { message: "Chatroom name's length must be between 3 and 25" })
	@Column({ unique: true })
	name: string;
}
