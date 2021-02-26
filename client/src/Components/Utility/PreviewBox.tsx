import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

interface PreviewBoxProps {
	url: string | undefined;
	domain: string | undefined;
	img: string | undefined;
	title: string | undefined;
	description: string | undefined;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({
	url,
	domain,
	img,
	title,
	description,
}) => {
	return (
		<a href={url} target='_blank'>
			<Box cursor='pointer' minWidth='250px' maxWidth='550px' h={28}>
				<Flex alignItems='center'>
					<img
						src={
							img === "" || img === undefined
								? "/img/error-404-message.png"
								: img
						}
						className='h-28 w-32 object-cover rounded-tl-xl rounded-bl-xl'
					/>

					<Flex
						flexDirection='column'
						border='1px solid #ccc'
						className='rounded-tr-xl rounded-br-xl'>
						<Box h='87px' w='full' rounded='lg'>
							<Box
								p={1}
								borderBottom='1px solid black'
								fontSize='sm'
								bg='gray.200'>
								<Heading textAlign='center' fontSize='sm'>
									{title === "" || title === undefined
										? "Title Not Available"
										: title}
								</Heading>
							</Box>
							<Text p={2} color='gray.700' fontSize='xx-small'>
								{description === "" || description === undefined
									? "Description not available for this url"
									: description}
							</Text>
						</Box>
						<Box bg='blue.500' textAlign='center' rounded='sm' w='full'>
							<Text color='white'>{domain}</Text>
						</Box>
					</Flex>
				</Flex>
			</Box>
		</a>
	);
};
export default PreviewBox;
