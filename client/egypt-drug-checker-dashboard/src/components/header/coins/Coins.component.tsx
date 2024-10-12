"use client";
import { Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { fonts } from "@/utils/theme/fonts";
import { useAppSelector } from "@/lib/store/hooks";

export default function Coins() {
	const user = useAppSelector((state) => state.user);
	return (
		<div className="flex items-center gap-1">
			<Typography variant="h5" fontWeight={fonts.weight.extraBold}>
				{user?.coins}
			</Typography>
			<MonetizationOnIcon
				color="primary"
				sx={{
					rotate: "10deg",
					fontSize: "3rem",
					"@media (max-width: 420px)": {
						fontSize: "1.5rem",
					},
				}}
			/>
		</div>
	);
}
