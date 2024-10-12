import CardContainer from "@/components/shared/card-container/CardContainer.component";
import { type IstoreItem } from "./StoreItem.model";
import TextButton from "@/components/shared/text-button/TextButton.component";
import { Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { fonts } from "@/utils/theme/fonts";

export default function StoreItem({
	title,
	coins,
	children,
	buttonValue,
	onClick,
}: IstoreItem) {
	return (
		<CardContainer>
			<div className="flex flex-col gap-2 p-3">
				<div className="flex flex-col justify-center items-center gap-4 pt-8">
					{children}
					<Typography
						variant="h5"
						color="primary"
						fontWeight={fonts.weight.bold}
					>
						{title}
					</Typography>
				</div>
				<div className="flex justify-between">
					<Typography variant="h6" fontWeight={fonts.weight.bold}>
						Cost:
					</Typography>
					<div className="flex items-center gap-1">
						<Typography variant="h6" fontWeight={fonts.weight.extraBold}>
							{coins}
						</Typography>
						<MonetizationOnIcon
							color="primary"
							sx={{
								rotate: "10deg",
								fontSize: "2rem",
							}}
						/>
					</div>
				</div>
				<TextButton buttonType="full" onClick={onClick}>
					{buttonValue}
				</TextButton>
			</div>
		</CardContainer>
	);
}
