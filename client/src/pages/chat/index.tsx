import { Box, Flex, Heading, Spinner, useDisclosure } from "@chakra-ui/react";
import { NextPage, NextPageContext } from "next";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { fetchChatrooms } from "../../redux/actions";
import Error from "../../Components/Utility/Error";
import { Chatroom as ChatroomType } from "../../Types";
import Chatroom from "../../Components/App/Chatroom/Chatrooms";

const Chat: NextPage = () => {
	const router = useRouter();
	const { isOpen, onOpen } = useDisclosure();
	const { chatrooms, loading, error } = useSelector(
		(state: any) => state.chatroom
	);

	useEffect(() => {
		if (!error) {
			onOpen();
		}
	}, [error]);

	return (
		<Box px={4} maxWidth='700px' m='auto' mt={24}>
			<Heading textAlign='center'>Join a Chat Room</Heading>

			<Box
				mt={10}
				h='73vh'
				minHeight='500px'
				width='100%'
				maxWidth='700px'
				overflowY='scroll'
				border='1px solid #ccc'>
				{loading ? (
					<Flex
						fontWeight='semibold'
						fontSize='lg'
						justifyContent='center'
						alignItems='center'
						w='full'
						h='full'>
						<Spinner />
					</Flex>
				) : error ? (
					<Flex
						w='100%'
						justifyContent='center'
						margin='auto'
						h='30%'
						alignItems='center'
						maxW='620px'
						paddingX={10}
						pb={4}>
						{isOpen && (
							<Error noCloseButton isOpen={isOpen}>
								Something went wrong! Please try again later.
							</Error>
						)}
					</Flex>
				) : (
					<>
						{chatrooms.map((chatroom: ChatroomType) => (
							<Chatroom
								id={chatroom.id}
								key={chatroom.id}
								createdAt={chatroom.createdAt}
								name={chatroom.name}
							/>
						))}
					</>
				)}
			</Box>
			<Button
				onClick={() => router.push("/create-chat")}
				_focus={{ outline: "none" }}
				w='full'>
				Create a chatroom
			</Button>
		</Box>
	);
};

Chat.getInitialProps = async (ctx: NextPageContext) => {
	const { store, req } = ctx;
	await store.dispatch(fetchChatrooms(ctx) as any);
};

export default Chat;
