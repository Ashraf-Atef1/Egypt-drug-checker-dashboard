import MUtypography from "@mui/material/Typography";
import { type IlabelField } from "./LabelField.model";

export default function LabelField({ title, value }: IlabelField) {
	return (
		<div>
			<MUtypography>
				<span className="text-primary font-bold">{title}: </span>
				{value}
			</MUtypography>
		</div>
	);
}
