import { Box, Heading, Link, Stack, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../Components/Utility/Button";
import { InputField } from "../Components/Utility/InputField";
import NextLink from "next/link";
import axios from "../utils/axios";
import Error from "../Components/Utility/Error";

interface CreateChatProps {}

const CreateChat: React.FC<CreateChatProps> = ({}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Create a Chat Room</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Box maxW='xl' m='auto' mt={6} p={10}>
				<Heading fontSize='2xl'>Create a chat room</Heading>
				<Box w='100%' margin='auto' maxW='620px' paddingX={10} pb={4}>
					{isOpen && (
						<Error isOpen={isOpen} onClose={onClose}>
							Something went wrong! Please try again later.
						</Error>
					)}
				</Box>

				<Formik
					initialValues={{
						name: "",
					}}
					onSubmit={async (values, { setErrors, setSubmitting }) => {
						const { name } = values;
						setSubmitting(true);
						onClose();
						try {
							const response = await axios.post(
								"/api/chatrooms/create-chatroom",
								{
									name,
								}
							);
							if (response.data.chatroom) {
								router.push("/chat");
							}
						} catch (err) {
							setSubmitting(false);
							if (
								err.message === "Network Error" ||
								err?.response?.status > 404
							) {
								onOpen();
							} else {
								setErrors(err.response?.data?.err);
							}
						}
					}}>
					{({ isSubmitting, handleSubmit }) => (
						<Form>
							<Stack spacing={4}>
								<InputField
									placeholder='Enter a chat room name'
									name='name'
									label='Name'
								/>

								<Button
									type='submit'
									isLoading={isSubmitting}
									w='full'
									onClick={handleSubmit as any}
									color='primary'>
									Create
								</Button>
							</Stack>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	);
};
export default CreateChat;
