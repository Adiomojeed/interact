/** @format */

import React from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./useDarkTheme";
import { DarkTheme, LightTheme } from "./themeColor";
import { GlobalStyles } from "./global";

const Theme = () => {
	const [theme, toggleTheme] = useDarkMode("light");

	return (
		<ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
			<>
				<GlobalStyles />
				<span onClick={toggleTheme}>
					{theme === "light" ? (
						<i className="fas fa-3x fa-moon"></i>
					) : (
						<i className="fas fa-3x fa-lightbulb"></i>
					)}
				</span>
			</>
		</ThemeProvider>
	);
};

export default Theme;
