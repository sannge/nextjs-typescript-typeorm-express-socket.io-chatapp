import { HamburgerIcon } from "@chakra-ui/icons";
import {
	Box,
	Flex,
	Heading,
	Icon,
	IconButton,
	Link,
	ListItem,
	Menu,
	MenuButton,
	MenuDivider,
	MenuGroup,
	MenuItem,
	MenuList,
	useToast,
	UnorderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsFillChatFill } from "react-icons/bs";
import { FaHome, FaUserPlus } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import { useWidth } from "../Hooks/useWidth";
import Button from "./Utility/Button";
import { useSelector, useDispatch } from "react-redux";
import NextLink from "next/link";
import { logout as logoutUser } from "../redux/actions";
import axios from "../utils/axios";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
	const router = useRouter();
	const width = useWidth();
	const { username, logoutError } = useSelector((state: any) => state.auth);
	const dispatch = useDispatch();
	const toast = useToast();

	const logout = async () => {
		dispatch(logoutUser());
		router.replace("/login");
	};
	return (
		<Box
			position='fixed'
			top='0'
			pt={2}
			zIndex='sticky'
			alignItems='center'
			bg='gray.900'
			color='white'
			w='full'
			h={12}>
			{logoutError &&
				toast({
					position: "top",
					title: "Logout Error",
					description: logoutError,
					status: "error",
					duration: 9000,
					isClosable: false,
				})}
			{/* Logo and title */}
			<Flex maxW='1600px' margin='auto' w='full'>
				<Heading
					px={3}
					py={1}
					flex={1}
					marginLeft={{
						base: 0,
						sm: 4,
					}}
					cursor='pointer'
					onClick={() => router.push("/")}
					fontSize='xl'
					fontFamily='cursive'
					fontWeight='semibold'>
					{"Chat App"}
				</Heading>
				<Flex mr={4} alignItems='center'>
					<Box px={3} py={1} rounded='md'>
						{username}
					</Box>
					{width > 680 ? (
						<>
							<NextLink href='/'>
								<Box
									ml={10}
									bg={router.pathname === "/" ? "gray.600" : ""}
									cursor='pointer'
									_hover={{ bg: "gray.600" }}
									px={3}
									py={1}
									rounded='md'>
									Home
								</Box>
							</NextLink>
							<NextLink href='/chat'>
								<Box
									cursor='pointer'
									bg={router.pathname === "/chat" ? "gray.600" : ""}
									_hover={{ bg: "gray.600" }}
									ml={10}
									px={3}
									py={1}
									rounded='md'>
									Chat
								</Box>
							</NextLink>
							<Box
								cursor='pointer'
								_hover={{ bg: "gray.600" }}
								ml={10}
								px={3}
								py={1}
								onClick={logout}
								rounded='md'>
								Logout
							</Box>
						</>
					) : (
						<Box ml={10}>
							<Menu placement='bottom-start'>
								<MenuButton
									as={IconButton}
									aria-label='Options'
									icon={<HamburgerIcon fontSize={20} />}
									border='none'
									variant='outline'
									_focus={{
										outline: "none",
									}}
									padding='0px'
									color='white'
									size='md'
									_hover={{}}
									_active={{
										bg: "gray.600",
									}}
									_pressed={{
										outline: "none",
									}}
								/>
								<MenuList>
									<NextLink href='/'>
										<MenuItem
											_hover={{ bg: "gray.200" }}
											_focus={{ outline: "none" }}
											color='black'>
											Home
										</MenuItem>
									</NextLink>
									<NextLink href='/chat'>
										<MenuItem
											_hover={{ bg: "gray.200" }}
											color='black'
											_focus={{ outline: "none" }}>
											Chat
										</MenuItem>
									</NextLink>

									<MenuItem
										onClick={logout}
										_hover={{ bg: "gray.200" }}
										color='black'
										_focus={{ outline: "none" }}>
										Logout
									</MenuItem>
								</MenuList>
							</Menu>
						</Box>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export default Navbar;
