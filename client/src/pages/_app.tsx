import App, { AppContext } from "next/app";
import cookies from "next-cookies";

import React from "react";
import "../styles/globals.css";
import { wrapper } from "../redux/store";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/react";
import { isValidTokens } from "../utils/isValidTokens";
import { redirect } from "../utils/redirect";
import { hydrateUser } from "../redux/actions";
import Navbar from "../Components/Navbar";
import Router from "next/router";

class MyApp extends App<AppContext & { isAuthRoute: boolean }> {
	static getInitialProps = async ({ Component, ctx }: AppContext) => {
		const { token, refreshToken } = cookies(ctx);
		let isAuthRoute = false;

		const authRoutes = [
			"/register",
			"/login",
			"/forgot-password",
			"/change-password",
		];
		const username = isValidTokens(token, refreshToken);

		if (username) {
			if (!ctx.store.getState().auth.username) {
				await ctx.store.dispatch(hydrateUser(username) as any);
			}
			authRoutes.forEach((authRoute) => {
				if (ctx.pathname.includes(authRoute)) {
					redirect(ctx, "/");
				}
			});
		} else {
			authRoutes.forEach((authRoute) => {
				if (ctx.pathname.includes(authRoute)) {
					isAuthRoute = true;
				}
			});
			if (!isAuthRoute) {
				//redirect to login

				if (!ctx.store.getState().auth.username) {
					redirect(ctx, "/login");
				}
			}
		}

		return {
			pageProps: {
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {}),
			},
			isAuthRoute,
		};
	};

	render() {
		const { Component, pageProps, isAuthRoute } = this.props;

		return (
			<ThemeProvider theme={theme}>
				<CSSReset />
				{!isAuthRoute && <Navbar />}
				<Component {...pageProps} />
			</ThemeProvider>
		);
	}
}

export default wrapper.withRedux(MyApp);
