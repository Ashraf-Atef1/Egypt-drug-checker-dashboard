import { ButtonProps } from "@mui/material";
import { UrlObject } from "url";
export interface ITextButton extends ButtonProps {
	buttonType: "full" | "outlined" | "outlinedFull" | "contained";
	children: string;
	to?: string | UrlObject;
}
