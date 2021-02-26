import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";

interface HydrateAuthProps {
	user: any;
	C: any;
}

const HydrateAuth: React.FC<HydrateAuthProps> = ({ C, user, ...props }) => {
	const dispatch = useDispatch();
	return <C {...props} />;
};
export default HydrateAuth;
