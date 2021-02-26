import { Request, Response, Router } from "express";
import checkAuth from "../middleware/permission";
import fetch from "node-fetch";
import cheerio from "cheerio";
import URL from "url";
import { getMetaRag, shortenText } from "../utils/getMetaRag";

const getPreviewData = async (req: Request, res: Response) => {
	const { url, id } = req.body;
	try {
		const html = await fetch(url).then((res) => res.text());

		const $ = cheerio.load(html);
		console.log($("h1").text());
		const metadata = {
			id,
			url,
			img: getMetaRag("image", $),
			title: getMetaRag("title", $) || $(`h1`).text(),
			description: shortenText(
				getMetaRag("description", $) || $(`p`).text(),
				100
			),
			domain: new URL.URL(url).hostname,
		};

		// {
		//     id: "a60d491d-8c70-4620-aa18-111ae1abaea9",
		//     url: "https://www.adelak.me",
		//     img:"https://www.npmjs.com/package/mongoose",
		//     title: "Mongoose",
		//     description: "Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.",
		//     domain: "npmjs.com"
		//   }
		return res.status(200).json({ metadata });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ err: "Something went wrong." });
	}
};

const router = Router();
router.post("/get-metadata", checkAuth, getPreviewData);

export default router;
