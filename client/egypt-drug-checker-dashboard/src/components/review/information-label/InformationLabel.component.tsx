import MUtypography from "@mui/material/Typography";
import { IinformationLabel } from "./InformationLabel.model";
export default function InformationLabel({
	title,
	children,
}: IinformationLabel) {
	return (
		<>
			<MUtypography
				// className="w-60"
				variant="h5"
				component="p"
				fontWeight="bold"
				color="primary"
			>
				{title}:
			</MUtypography>
			<div className="mb-2">{children}</div>
		</>
	);
}
