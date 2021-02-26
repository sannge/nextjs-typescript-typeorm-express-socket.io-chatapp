import React from "react";
import {
	Alert,
	AlertIcon,
	AlertDescription,
	AlertTitle,
	CloseButton,
	Box,
	ScaleFade,
} from "@chakra-ui/react";

interface ErrorProps {
	isOpen: boolean;
	onClose?: () => void;
	noCloseButton?: boolean;
}

const Error: React.FC<ErrorProps> = ({
	isOpen,
	onClose,
	children,
	noCloseButton,
}) => {
	return (
		<ScaleFade initialScale={0.9} in={isOpen}>
			{isOpen && (
				<Alert padding='25px' borderRadius='lg' status='error'>
					<AlertIcon />
					<Box>
						<AlertTitle>Error!</AlertTitle>
						<AlertDescription display='block'>{children}</AlertDescription>
					</Box>
					{!noCloseButton && (
						<CloseButton
							_focus={{
								outline: "green",
								border: "2px",
								borderColor: "green.700",
							}}
							position='absolute'
							onClick={onClose}
							right='8px'
							top='8px'
						/>
					)}
				</Alert>
			)}
		</ScaleFade>
	);
};
export default Error;
