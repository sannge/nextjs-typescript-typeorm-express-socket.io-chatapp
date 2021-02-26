import { Box, Heading, Link, Stack, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import NextLink from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import Button from "../Components/Utility/Button";
import Error from "../Components/Utility/Error";
import { InputField } from "../Components/Utility/InputField";
import axios from "../utils/axios";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const Register: NextPage = ({}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Register</title>
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
				<Formik
					initialValues={{
						username: "",
						email: "",
						password: "",
					}}
					onSubmit={async (values, { setErrors, setSubmitting }) => {
						const { username, email, password } = values;
						setSubmitting(true);
						onClose();
						try {
							const response = await axios.post("/api/auth/register", {
								username,
								email,
								password,
							});
							if (response.data.user) {
								router.push("/login");
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
									placeholder='username'
									name='username'
									label='Username'
								/>
								<InputField placeholder='Email' name='email' label='Email' />
								<InputField
									placeholder='Password'
									name='password'
									label='Password'
									type='password'
								/>

								<Button
									type='submit'
									isLoading={isSubmitting}
									w='full'
									onClick={handleSubmit as any}
									color='primary'>
									Sign Up
								</Button>
								<Box>
									Already have an account?{" "}
									<NextLink href='/login'>
										<Link fontWeight='semibold'>Login Here</Link>
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

export default Register;
