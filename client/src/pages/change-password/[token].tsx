import { Box, Heading, Link, Stack, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../Components/Utility/Button";
import Error from "../../Components/Utility/Error";
import { InputField } from "../../Components/Utility/InputField";
import axios from "../../utils/axios";

interface TokenProps {}

const Token: React.FC<TokenProps> = ({}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Change Your Passworrd</title>
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
							Sorry, Token Expired!
						</Error>
					)}
				</Box>

				<Formik
					initialValues={{
						password: "",
						confirmPassword: "",
					}}
					onSubmit={async (values, { setErrors, setSubmitting }) => {
						const { password, confirmPassword } = values;
						setSubmitting(true);
						onClose();
						try {
							const response = await axios.post(
								`/api/auth/change-password/${router.query.token}`,
								{
									password,
									confirmPassword,
								}
							);
							if (response.data) {
								setSubmitting(false);
								router.replace("/login");
							}
						} catch (err) {
							setSubmitting(false);
							if (
								err.message === "Network Error" ||
								err?.response?.status > 404
							) {
								onOpen();
							} else {
								setErrors(err.response?.data.err);
							}
						}
					}}>
					{({ isSubmitting, handleSubmit }) => (
						<Form>
							<Stack spacing={4}>
								<InputField
									placeholder='Password'
									name='password'
									label='Password'
									type='password'
								/>
								<InputField
									placeholder='Confirm Password'
									name='confirmPassword'
									label='Confirm Password'
									type='password'
								/>

								<Button
									type='submit'
									isLoading={isSubmitting}
									w='full'
									onClick={handleSubmit as any}
									color='primary'>
									Change Password
								</Button>
								<Box>
									Changed your mind?{" "}
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
export default Token;
