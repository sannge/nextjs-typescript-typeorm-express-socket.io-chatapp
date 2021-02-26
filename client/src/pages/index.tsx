import { Flex, Text, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
	const { username, logoutLoading } = useSelector((state: any) => state.auth);
	return (
		<Flex
			className='text-6xl'
			h='96vh'
			w='full'
			textAlign='center'
			fontWeight='bold'
			justifyContent='center'
			alignItems='center'>
			{logoutLoading ? (
				<Spinner />
			) : (
				<Text>
					Welcome, <br />
					{username} {":)"}
				</Text>
			)}
		</Flex>
	);
};

export default Home;
