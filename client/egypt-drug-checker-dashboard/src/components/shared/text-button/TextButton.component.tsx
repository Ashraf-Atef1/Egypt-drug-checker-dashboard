import MUbutton from "@mui/material/Button";
import { type ITextButton } from "./TextButton.model";
import { Typography } from "@mui/material";
import Link from "next/link";

const TextButtonType = {
	full: {
		width: "100%",
	},
	outlined: {
		border: "0.2rem solid",
	},
	outlinedFull: {
		width: "100%",
		border: "0.2rem solid",
	},
	contained: {
		width: "auto",
	},
};
export default function TextButton({
	buttonType,
	to,
	children,
	...props
}: ITextButton) {
	const variant = buttonType.includes("outlined") ? "outlined" : "contained";
	return (
		<MUbutton
			sx={TextButtonType[buttonType]}
			variant={variant}
			//chore: to remove as To BE Done
			href={to as string}
			component={to ? Link : "button"}
			{...props}
		>
			<Typography variant="subtitle1" component="span" fontWeight={600} noWrap>
				{children}
			</Typography>
		</MUbutton>
	);
}
