export const getMetaRag = (name: string, $: any) => {
	return (
		$(`meta[name=${name}]`).attr("content") ||
		$(`meta[name="og:${name}"]`).attr("content") ||
		$(`meta[name="twitter:${name}"]`).attr("content") ||
		$(`meta[property=${name}]`).attr("content") ||
		$(`meta[property="og:${name}"]`).attr("content") ||
		$(`meta[property="twitter:${name}"]`).attr("content")
	);
};

export const shortenText = (text: string, limit: number) => {
	if (text.length >= limit) {
		text = text.substring(0, limit) + "...";
	}
	return text;
};
