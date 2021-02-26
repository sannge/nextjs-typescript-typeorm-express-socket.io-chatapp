import { Box, Button, Flex, Heading, Avatar } from "@chakra-ui/react";
import React from "react";
import { useWidth } from "../../../Hooks/useWidth";

interface ActiveUsersProps {
	activeUsers: string[];
	leaveChatRoom: () => void;
}

const ActiveUsers: React.FC<ActiveUsersProps> = ({
	activeUsers,
	leaveChatRoom,
}) => {
	const width = useWidth();
	return (
		<>
			<Box
				h='100%'
				borderLeft='1px solid #ccc'
				boxShadow='3px 3px 3px 0px #ccc'
				bg='white'
				w={"35%"}>
				<Flex justifyContent='center' ali h='full' m='auto'>
					<Box h={10}>
						<Box w='full' p={2}>
							<Button
								mb={4}
								_focus={{
									outline: "none",
								}}
								onClick={leaveChatRoom}
								w='100%'
								maxWidth='300px'
								_hover={{ bg: "red.600" }}
								color='white'
								bg='red.500'>
								Leave
							</Button>
						</Box>
						<Box
							px={4}
							w='full'
							h='80vh'
							justifyContent='center'
							alignItems='center'>
							<Heading mb={2} fontSize='md' textAlign='center'>
								{activeUsers.length} Current Users
							</Heading>
							<Box h={width >= 680 ? "96%" : "92%"} overflowY='scroll'>
								{activeUsers.map((activeUser) => (
									<Flex
										key={activeUser}
										px={4}
										py={2}
										align='center'
										justifyContent={width < 680 ? "center" : ""}
										alignItems='center'>
										<Avatar size='sm' name={activeUser} mr={4} />
										{width > 680 && (
											<Heading fontSize='lg'>{activeUser}</Heading>
										)}
									</Flex>
								))}
							</Box>
						</Box>
					</Box>
				</Flex>
			</Box>
		</>
	);
};
export default ActiveUsers;
