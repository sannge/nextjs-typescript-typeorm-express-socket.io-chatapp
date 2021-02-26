import {
	Box,
	Heading,
	Link,
	Stack,
	useDisclosure,
	useToast,
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

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();
	const toast = useToast();

	return (
		<>
			<Head>
				<title>ForgotPassword</title>
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
					}}
					onSubmit={async (values, { setErrors, setSubmitting }) => {
						const { email } = values;
						setSubmitting(true);
						onClose();
						try {
							const response = await axios.post("/api/auth/forgot-password", {
								email,
							});
							if (response.data.success) {
								setSubmitting(false);
								toast({
									position: "top",
									title: "Change Password Link has been sent",
									description:
										"If you did not receive the email in a few minutes, please request it again.",
									status: "success",
									duration: 9000,
									isClosable: true,
								});
							}
						} catch (err) {
							setSubmitting(false);
							if (
								err.message === "Network Error" ||
								err?.response?.status > 404
							) {
								onOpen();
							} else {
								setErrors(err.response?.data);
							}
						}
					}}>
					{({ isSubmitting, handleSubmit }) => (
						<Form>
							<Stack spacing={4}>
								<InputField placeholder='Email' name='email' label='Email' />

								<Button
									type='submit'
									isLoading={isSubmitting}
									w='full'
									onClick={handleSubmit as any}
									color='primary'>
									Forgot Password
								</Button>
								<Box>
									Remember the account?
									<NextLink href='/login'>
										<Link ml={2} fontWeight='semibold'>
											Login Here
										</Link>
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
export default ForgotPassword;
