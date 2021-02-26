import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	name: string;
	textarea?: boolean;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
	label,
	textarea,
	...props
}) => {
	let TextField: any = Input;
	if (textarea) {
		TextField = Textarea;
	}
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<TextField
				{...field}
				{...props}
				id={field.name}
				background='gray.50'
				transitionProperty='all'
				transitionDuration='.2s'
				transition='ease-in-out'
				_hover={{
					background: "white",
				}}
				_focus={{
					outline: "green",
					border: "2px",
					borderColor: "green.700",
					background: "white",
				}}
			/>

			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};
