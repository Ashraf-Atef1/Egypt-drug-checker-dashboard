import { type IcontentContainer } from "./ContentContainer.model";
import MUtypography from "@mui/material/Typography";
import { fonts } from "@/utils/theme/fonts";
import Link from "next/link";
import MUarrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ContentContainer({
	title,
	to,
	children,
}: IcontentContainer) {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex justify-center lg:justify-between items-center">
				<MUtypography
					variant="h5"
					component="h3"
					fontWeight={fonts.weight.bold}
					className="text-2xl font-semibold text-primary"
				>
					{title}
				</MUtypography>
				<Link href={to} className="hidden lg:block">
					<MUtypography
						variant="h6"
						component="span"
						fontWeight={fonts.weight.bold}
						className="text-2xl font-semibold text-primary"
					>
						Show more
						<MUarrowForwardIosIcon color="primary" />
					</MUtypography>
				</Link>
			</div>
			{children}
			<Link href={to} className="flex justify-end lg:hidden">
				<MUtypography
					variant="h6"
					component="span"
					fontWeight={fonts.weight.bold}
					className="text-2xl font-semibold text-primary"
				>
					Show more
					<MUarrowForwardIosIcon color="primary" />
				</MUtypography>
			</Link>
		</div>
	);
}
