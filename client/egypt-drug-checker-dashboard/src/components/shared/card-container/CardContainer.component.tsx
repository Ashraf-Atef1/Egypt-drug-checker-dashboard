import { Card as CNcard } from "@/components/ui/card";
import { type IcardContainer } from "./CardContainer.model";

export default function CardContainer({
	children,
	hideHoveringBorder  }
	: IcardContainer) {
	let hoveringStyle = " hover:border-primary"
	if (hideHoveringBorder) {
		hoveringStyle = ""
	}
	return (
		<CNcard className={"border-4 border-secondary transition-[border]" + hoveringStyle}>
			{children}
		</CNcard>
	);
}
