import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface TopbarProps {
	chatroomName: string | string[] | undefined;
}

const Topbar: React.FC<TopbarProps> = ({ chatroomName }) => {
	return (
		<Box h={10} bg='gray.900'>
			<Heading h='full' color='white' textAlign='center' fontSize='xl'>
				<Flex h='full' justifyContent='center' alignItems='center'>
					{chatroomName}
				</Flex>
			</Heading>
		</Box>
	);
};
export default Topbar;
