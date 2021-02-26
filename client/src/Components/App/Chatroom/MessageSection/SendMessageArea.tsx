import { Box, Textarea, IconButton, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdSend } from "react-icons/md";

interface SendMessageAreaProps {
	sendMessage: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}
const constrainInput = (str) => {
	return str.replace(/[\r\n\v]+/g, "");
};
const SendMessageArea: React.FC<SendMessageAreaProps> = ({
	sendMessage,
	message,
	setMessage,
}) => {
	return (
		<>
			<Flex alignItems='flex-end'>
				<Box bg='white' pt={4} px={2} flex={1}>
					<Textarea
						border='2px solid black'
						value={message}
						onChange={(e) => setMessage(constrainInput(e.target.value))}
						_focus={{ outline: "none" }}
						onKeyPress={(e) => sendMessage(e)}
					/>
				</Box>
			</Flex>
		</>
	);
};
export default SendMessageArea;
