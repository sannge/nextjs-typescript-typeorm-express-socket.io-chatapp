import { Chatroom } from "../entities/Chatroom";

const users: { id: string; name: string; room: string }[] = [];

const addUser = async ({
	id,
	name,
	room,
}: {
	id: string;
	name: string;
	room: string;
}) => {
	// name = name.trim().toLowerCase();
	// room = room.trim().toLowerCase();

	const existingUser = users.find(
		(user) => user.room === room && user.name === name
	);

	if (!name || !room) return { error: "Username and room are required." };
	if (existingUser) return { error: "User is already joined." };

	const chatroom = await Chatroom.findOne({ name: room });
	if (!chatroom) {
		return { error: "The chatroom does not exist." };
	}
	//kick the user out of the chat room back to main chatrooms if errors

	const user = { id, name, room };

	users.push(user);

	return { user };
};

const removeUser = (id: string) => {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) return users.splice(index, 1)[0];
	return undefined;
};

const getUser = (id: string) => users.find((user) => user.id === id);

const getUsersInRoom = (room: string) =>
	users.filter((user) => user.room === room);

export { addUser, removeUser, getUser, getUsersInRoom };
