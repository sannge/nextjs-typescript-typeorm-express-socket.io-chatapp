import {
	Box,
	Heading,
	Link,
	Stack,
	useDisclosure,
	Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../Components/Utility/Button";
import { InputField } from "../Components/Utility/InputField";
import NextLink from "next/link";
import axios from "../utils/axios";
import Error from "../Components/Utility/Error";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Box maxW='xl' m='auto' mt={20} p={10}>
				<Heading
					px={3}
					py={1}
					flex={1}
					textAlign='center'
					marginLeft={{
						base: 0,
						sm: 4,
					}}
					mb={6}
					cursor='pointer'
					onClick={() => router.push("/")}
					fontSize='3xl'
					fontFamily='cursive'
					fontWeight='semibold'>
					{"Chat App"}
				</Heading>
				<Box w='100%' margin='auto' maxW='620px' paddingX={10} pb={4}>
					{isOpen && (
						<Error isOpen={isOpen} onClose={onClose}>
							Something went wrong! Please try again later.
						</Error>
					)}
				</Box>

				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					onSubmit={async (values, { setErrors, setSubmitting }) => {
						const { email, password } = values;
						setSubmitting(true);
						onClose();
						try {
							const response = await axios.post("/api/auth/login", {
								email,
								password,
							});
							if (response.data.user) {
								router.replace("/");
								router.reload();
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
								<InputField placeholder='Email' name='email' label='Email' />
								<InputField
									placeholder='Password'
									name='password'
									label='Password'
									type='password'
								/>
								<NextLink href='/forgot-password'>
									<Link>Forgot Password?</Link>
								</NextLink>

								<Button
									type='submit'
									isLoading={isSubmitting}
									w='full'
									onClick={handleSubmit as any}
									color='primary'>
									Login
								</Button>
								<Box>
									Already have an account?{" "}
									<NextLink href='/register'>
										<Link fontWeight='semibold'>Register Here</Link>
									</NextLink>
								</Box>
							</Stack>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	);
};
export default Login;
