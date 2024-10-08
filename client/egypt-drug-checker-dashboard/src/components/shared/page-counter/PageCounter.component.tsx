import MUtypography from "@mui/material/Typography";
import { IpageCounter } from "./pageCounter.model";

export default function PageCounter({ title, value }: IpageCounter) {
	return (
		<div className="text-md sm:text-2xl">
			<MUtypography variant="inherit" component="h4" fontWeight="bold">
				{title} (<span className="text-primary">{value}</span>):
			</MUtypography>
		</div>
	);
}
