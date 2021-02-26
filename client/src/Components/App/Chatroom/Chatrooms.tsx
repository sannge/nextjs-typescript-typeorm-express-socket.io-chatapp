import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import moment from "moment";
import Button from "../../Utility/Button";
import { useRouter } from "next/router";

interface ChatroomProps {
	name: string;
	createdAt: string;
	id: string;
}

const Chatroom: React.FC<ChatroomProps> = ({ name, createdAt, id }) => {
	const router = useRouter();
	return (
		<Flex justifyContent='space-between' p={4} borderBottom='1px solid #ccc'>
			<Flex flexDirection='column'>
				<Text>
					<Box fontWeight='semibold' fontSize='lg' display='inline'>
						{name}
					</Box>
				</Text>
				<Text fontSize='sm'>
					<Text display='inline' fontWeight='semibold' fontSize='sm'>
						Created Date:{" "}
					</Text>
					{moment(new Date(createdAt)).format("MMMM Do YYYY, h:mm:ss a")}
				</Text>
			</Flex>
			<Button
				onClick={() => router.push(`/chat/${id}?name=${name}`)}
				w={20}
				color='primary'>
				Join
			</Button>
		</Flex>
	);
};
export default Chatroom;
