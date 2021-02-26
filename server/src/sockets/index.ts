import { Socket } from "socket.io";
import { addUser, getUser, getUsersInRoom, removeUser } from "./users";

// interface ConnectedUserProps {
// 	[room: string]: { username: string; id: string }[];
// }

// let connectedUsers: ConnectedUserProps = {};

export const socketHandler = (io: any) => {
	io.on("connection", (socket: Socket) => {
		//connect and disconnect users
		console.log(`SocketID: ${socket.id} is connected to the WS server.`);
		//on Disconnect, take the user out of the map
		socket.on("disconnect", () => {
			console.log(`SocketID: ${socket.id} is disconnected from the WS server.`);
			const user = removeUser(socket.id);

			if (user) {
				io.to(user.room).emit("message", {
					user: "Admin",
					text: `${user.name} has left.`,
				});
				io.to(user.room).emit("roomData", {
					room: user.room,
					users: getUsersInRoom(user.room),
				});
			}
		});

		//When a user join a room
		socket.on(
			"joinRoom",
			async (
				{ username, room }: { username: string; room: string },
				callback
			) => {
				//add username into the connectedUser map
				const { error, user } = await addUser({
					id: socket.id,
					name: username,
					room,
				});

				if (error) return callback(error);
				//user exists from this point
				socket.join(user!.room);
				socket.emit("message", {
					user: "Admin",
					text: `${user!.name}, welcome to room ${user!.room}.`,
				});
				socket.broadcast.to(user!.room).emit("message", {
					user: "Admin",
					text: `${user!.name} has joined!`,
				});

				io.to(user!.room).emit("roomData", {
					room: user!.room,
					users: getUsersInRoom(user!.room),
				});
				callback();
			}
		);

		//When the user send a message
		socket.on("sendMessage", (message, callback) => {
			//emit the message back to the room
			const user = getUser(socket.id);

			io.to(user!.room).emit("message", { user: user!.name, text: message });

			callback();
		});
	});
};
