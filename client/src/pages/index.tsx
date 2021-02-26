import { Flex, Text, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
	const { username, logoutLoading } = useSelector((state: any) => state.auth);
	return (
		<>
			<Head>
				<title>{`Welcome to our ChatApp`}</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<meta
					property='og:title'
					content={`Welcome to our ChatApp`}
					key='title'
				/>
				<meta
					name='keywords'
					content='Next.JS, Typescript, Redux, Typeorm, Socket.io, Express, ChakraUI, Tailwind-CSS, Chat-App'></meta>
				<meta
					name='description'
					content='This is the chatroom for made in PENN stack with socket.io, redux, tailwind-css, and chakraui.'></meta>
			</Head>

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
		</>
	);
};

export default Home;
