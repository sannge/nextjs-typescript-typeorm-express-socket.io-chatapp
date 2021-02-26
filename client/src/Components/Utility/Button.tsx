import React from "react";
import { Button, ButtonProps as Props } from "@chakra-ui/react";

interface ButtonProps {
	color: "primary" | "secondary";
	isLoading?: boolean;
	on?: "form" | "link";
	w?: number | string;
}

const ButtonComponent: React.FC<ButtonProps & Props> = ({
	children,

	color,
	isLoading,
	on = "form",
	w,
	...rest
}) => {
	return (
		<Button
			{...rest}
			w={w ? w : on === "form" ? "50%" : "90px"}
			background={color === "primary" ? "green.700" : "white"}
			color={color === "primary" ? "white" : "green.700"}
			border={color === "secondary" ? "1px" : "0"}
			borderColor={color === "secondary" ? "green.700" : "none"}
			transition='background 0.3s ease-in-out'
			_focus={{
				outline: "none",
			}}
			isLoading={isLoading}>
			{children}
		</Button>
	);
};
export default ButtonComponent;
