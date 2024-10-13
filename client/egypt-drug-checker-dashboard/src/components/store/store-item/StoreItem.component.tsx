import CardContainer from "@/components/shared/card-container/CardContainer.component";
import { type IstoreItem } from "./StoreItem.model";
import TextButton from "@/components/shared/text-button/TextButton.component";
import MUtypography from "@mui/material/Typography";
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
					<MUtypography
						variant="h5"
						color="primary"
						fontWeight={fonts.weight.bold}
					>
						{title}
					</MUtypography>
				</div>
				<div className="flex justify-between">
					<MUtypography variant="h6" fontWeight={fonts.weight.bold}>
						Cost:
					</MUtypography>
					<div className="flex items-center gap-1">
						<MUtypography variant="h6" fontWeight={fonts.weight.extraBold}>
							{coins}
						</MUtypography>
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
