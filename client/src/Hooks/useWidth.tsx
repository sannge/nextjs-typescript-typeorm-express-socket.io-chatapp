import React, { useState, useEffect } from "react";

export const useWidth = () => {
	const [width, setWidth] = useState(0); // default width, detect on server.
	const handleResize = () => setWidth(window.innerWidth);
	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	return width;
};
