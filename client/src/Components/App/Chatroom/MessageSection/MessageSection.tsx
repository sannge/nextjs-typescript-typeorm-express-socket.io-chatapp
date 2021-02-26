import { Flex } from "@chakra-ui/react";
import React from "react";
import MessageDisplayArea from "./MessageDisplayArea";
import SendMessageArea from "./SendMessageArea";
import Topbar from "./Topbar";

interface MessageSectionProps {
	room: string | string[] | undefined;
	sendMessage: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	scroll: boolean;
	setScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageSection: React.FC<MessageSectionProps> = ({
	room,
	sendMessage,
	setMessage,
	message,
	scroll,
	setScroll,
}) => {
	return (
		<Flex
			flexDirection='column'
			ml={2}
			h='full'
			borderLeft='1px solid #ccc'
			boxShadow='2px 2px 2px 0px #ccc'
			w='full'>
			<Topbar chatroomName={room} />
			<MessageDisplayArea scroll={scroll} setScroll={setScroll} />
			<SendMessageArea
				message={message}
				setMessage={setMessage}
				sendMessage={sendMessage}
			/>
		</Flex>
	);
};
export default MessageSection;
