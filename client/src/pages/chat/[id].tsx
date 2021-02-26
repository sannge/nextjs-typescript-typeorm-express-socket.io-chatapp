import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import Error from "../../Components/Utility/Error";
import ActiveUsers from "../../Components/App/Chatroom/ActiveUsers";
import MessageSection from "../../Components/App/Chatroom/MessageSection/MessageSection";
import { Socket } from "socket.io-client";
import { setMessages } from "../../redux/actions";
import Head from "next/head";

let socket: typeof Socket;

const GroupChat: React.FC = () => {
	const messages = useSelector((state: any) => state.messagesReducer.messages);

	const [err, setErr] = useState(null);
	const [message, setMessage] = useState<string>("");
	const router = useRouter();
	const [scroll, setScroll] = useState(false);
	const dispatch = useDispatch();

	const [activeUsers, setActiveUsers] = useState([]);

	let room;
	if (router.query.name) {
		if (typeof router.query.name === "object") {
			room = router.query.name[0];
		} else {
			room = router.query.name;
		}
	} else {
		room = undefined;
	}

	const username = useSelector((state: any) => state.auth.username);
	const { isOpen, onOpen } = useDisclosure();
	const leaveChatRoom = () => {
		socket.disconnect();
		router.replace("/chat");
	};

	useEffect(() => {
		if (err) {
			onOpen();
		}
	}, [err]);

	useEffect(() => {
		socket = io(process.env.NEXT_PUBLIC_SERVER_BASE_URL!);
		socket.emit("joinRoom", { username, room }, (error) => {
			if (error) {
				setErr(error);
			}
		});
		return () => {
			socket.disconnect();
		};
	}, [process.env.NEXT_PUBLIC_SERVER_BASE_URL, room]);

	useEffect(() => {
		socket.on("message", (message) => {
			dispatch(setMessages(message));
		});
	}, []);

	useEffect(() => {
		console.log("Messages changed!!!!!");
		setScroll(true);
	}, [messages]);

	useEffect(() => {
		socket.on("roomData", ({ users }) => {
			const flattenedUsers = users.map((user) => user.name);
			setActiveUsers(flattenedUsers);
		});
	}, [activeUsers]);

	const sendMessage = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			if (message.trim() === "") {
				setMessage("");
				return;
			}
			socket.emit("sendMessage", message, () => setMessage(""));
		}
	};

	return (
		<>
			<Head>
				<title>{`${router.query.name}, Real time Chatroom`}</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<meta
					property='og:title'
					content={`${router.query.name}, Real time Chatroom`}
					key='title'
				/>
				<meta
					name='keywords'
					content='Next.JS, Typescript, Redux, Typeorm, Socket.io, Express, ChakraUI, Tailwind-CSS, Chat-App'></meta>
				<meta
					name='description'
					content='This is the chatroom for made in PENN stack with socket.io, redux, tailwind-css, and chakraui.'></meta>
			</Head>
			{err ? (
				<Box w='100%' margin='auto' mt={16} maxW='620px' paddingX={10} pb={4}>
					{isOpen && (
						<Error isOpen={isOpen} noCloseButton>
							{err}
						</Error>
					)}
				</Box>
			) : (
				<Box
					flexDirection='column'
					maxWidth='1600px'
					m='auto'
					h='95vh'
					p={4}
					mt={10}>
					<Flex h='full' minHeight='400px'>
						<ActiveUsers
							leaveChatRoom={leaveChatRoom}
							activeUsers={activeUsers}
						/>
						<MessageSection
							room={room}
							setMessage={setMessage}
							message={message}
							sendMessage={sendMessage}
							scroll={scroll}
							setScroll={setScroll}
						/>
					</Flex>
				</Box>
			)}
		</>
	);
};

export default GroupChat;
