import { ButtonProps } from "@mui/material";
export interface ITextButton extends ButtonProps {
	buttonType: "full" | "outlined" | "outlinedFull" | "contained";
	children: string;
	to?: string;
}
