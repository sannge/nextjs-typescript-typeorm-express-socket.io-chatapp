import { Box, Text, Avatar, Flex } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../utils/axios";
import { uuid } from "../../../../utils/uuid";

import PreviewBox from "../../../Utility/PreviewBox";
import { addLinks } from "../../../../utils/addLinks";

interface EachMessageProps {
	message: { user: string; text: string };
}

const EachMessage: React.FC<EachMessageProps> = ({ message }) => {
	const { text, user } = message;
	const [urlifiedText, setUrliedText] = useState<string[] | null>(null);
	const username = useSelector((state: any) => state.auth.username);

	const urlify = (text: string) => {
		var urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
		let parts = text.split(urlRegex);
		let url = parts[1] || null;
		if (url) {
			axios
				.post("/api/preview-link/get-metadata", {
					url,
					id: uuid(),
				})
				.then((res) => {
					const { description, img, domain, title, url } = res.data.metadata;
					addLinks(parts);
					const previewPart = (
						<PreviewBox
							description={description}
							img={img}
							domain={domain}
							title={title}
							url={url}
						/>
					);
					parts.push(previewPart as any);
					setUrliedText(parts);
				})
				.catch(() => {
					addLinks(parts);
					setUrliedText(parts);
				});
		} else {
			for (let i = 1; i < parts.length; i += 2) {
				addLinks(parts);
			}
			setUrliedText(parts);
		}
	};

	useEffect(() => {
		urlify(text);
	}, []);

	return (
		<>
			{user === "Admin" ? (
				<Box w='full' textAlign='center' fontSize='x-small'>
					{text}
				</Box>
			) : (
				<Flex mb={6}>
					<Avatar size='sm' name={user} />
					<Flex flexDirection='column'>
						<Text ml={2} fontSize='small'>
							{user === username ? "You" : user}:
						</Text>
						<Text wordBreak='break-word' ml={2} className='__text'>
							{urlifiedText ? urlifiedText : text}
						</Text>
					</Flex>
				</Flex>
			)}
		</>
	);
};
export default EachMessage;
