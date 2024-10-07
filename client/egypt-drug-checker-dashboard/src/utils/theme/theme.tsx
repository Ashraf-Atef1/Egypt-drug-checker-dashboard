"use client";
import { createTheme } from "@mui/material/styles";

const MUtheme = createTheme({
	shape: {
		borderRadius: 8,
	},
	palette: {
		primary: {
			main: "hsl(var(--primary))",
			light: "hsl(var(--primary-light))",
			dark: "hsl(var(--primary-dark))",
			contrastText: "hsl(var(--primary-foreground))",
		},
		secondary: {
			main: "hsl(var(--secondary))",
			light: "hsl(var(--secondary-light))",
			dark: "hsl(var(--secondary-dark))",
			contrastText: "hsl(var(--secondary-foreground))",
		},
		info: {
			main: "hsl(var(--muted))",
			light: "hsl(var(--muted-light))",
			dark: "hsl(var(--muted-dark))",
			contrastText: "hsl(var(--muted-foreground))",
		},
	},
	typography: {
		fontFamily: "var(--font-inter)",
	},
});
export default MUtheme;
