"use client";
import MUtypography from "@mui/material/Typography";
import { fonts } from "@/utils/theme/fonts";
import { usePathname } from "next/navigation";

const PathToTitle: { [key: string]: string } = {
	home: "Dashboard",
	review: "Drugs review",
	"leader-board": "Leader board",
	reviews: "Drugs reviews",
	store: "Store",
	users: "Users",
};
export default function PageTitle() {
	const pathname = usePathname().split("/")[1];
	return (
		<MUtypography
			variant="h4"
			component="h1"
			fontWeight={fonts.weight.bold}
			color="primary"
		>
			{pathname && PathToTitle[pathname]}
		</MUtypography>
	);
}
