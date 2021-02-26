export const addLinks = (parts) => {
	for (let i = 1; i < parts.length; i += 2) {
		parts[i] = (
			<a key={"link" + i} href={parts[i]}>
				{parts[i]}
			</a>
		) as any;
	}
};
