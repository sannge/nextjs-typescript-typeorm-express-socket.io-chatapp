import { NextPageContext } from "next";
import Router from "next/router";

export const redirect = (ctx: NextPageContext, location: string) => {
	if (ctx.res) {
		ctx.res.writeHead(303, { Location: location });
		return ctx.res.end();
	} else {
		Router.replace(location);
	}
};
