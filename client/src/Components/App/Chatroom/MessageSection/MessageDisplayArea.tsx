import React, { useEffect, useRef } from "react";
import { Box, Flex } from "@chakra-ui/react";
import EachMessage from "./EachMessage";
import { useSelector } from "react-redux";

interface MessageDisplayAreaProps {
	scroll: boolean;
	setScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageDisplayArea: React.FC<MessageDisplayAreaProps> = ({
	scroll,
	setScroll,
}) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const messages = useSelector((state: any) => state.messagesReducer.messages);

	const scrollToBottom = () => {
		scrollRef.current?.scrollIntoView();
	};

	useEffect(() => {
		if (scroll) {
			scrollToBottom();
			setScroll(false);
		}
	}, [scroll]);

	return (
		<Box w='full' h='full' overflowY='scroll' p={2}>
			<Flex flexDirection='column'>
				{[...messages].map((message, index) => (
					<EachMessage key={index} message={message} />
				))}
				<div ref={scrollRef} />
			</Flex>
		</Box>
	);
};
export default MessageDisplayArea;
