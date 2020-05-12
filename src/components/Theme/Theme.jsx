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
				<div className="theme--toggler">
					<span onClick={toggleTheme}>
						{theme === "light" ? (
							<i className="fas fa-moon"></i>
						) : (
							<i className="fas fa-lightbulb"></i>
						)}
					</span>
				</div>

				{/**<div className="theme--toggler">
					<button onClick={toggleTheme}>
						{theme === "light" ? (
							"Dark"
						) : (
							"Light"
						)}
					</button>
				</div> */}
			</>
		</ThemeProvider>
	);
};

export default Theme;
