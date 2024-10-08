import MUtypography from "@mui/material/Typography";
import { Icount } from "./count.model";
import { fonts } from "@/utils/theme/fonts";

export default function Count({ title, count, countDen }: Icount) {
	return (
		<div className="flex flex-col gap-4 items-center">
			<MUtypography
				variant="inherit"
				fontWeight={fonts.weight.semiBold}
				component="h4"
			>
				{title}
			</MUtypography>
			<MUtypography
				variant="h6"
				component="span"
				fontWeight={fonts.weight.bold}
				color="primary"
			>
				{count}
				{countDen && `/${countDen}`}
			</MUtypography>
		</div>
	);
}
