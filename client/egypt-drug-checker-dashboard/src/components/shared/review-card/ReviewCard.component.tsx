import { type IreviewCard } from "./ReviewCard.model";
import CardContainer from "../card-container/CardContainer.component";
import TextButton from "../text-button/TextButton.component";
import LabelField from "./label-field/LabelField.component";
import { headers } from "next/headers";

export default function ReviewCard({
	buttonType,
	reviewerName,
	tradeName,
	genericName,
	pharmacology,
	buttonTitle,
	hideButton = false,
	hideHoveringBorder,
	to
}: IreviewCard) {
	const headerList = headers();
	const pathname = headerList.get("x-current-path");

	return (
		<CardContainer hideHoveringBorder={hideHoveringBorder ? true : undefined}>
			<div className="flex flex-col gap-2 p-2">
				<div className="flex flex-col gap-2">
					{reviewerName && (
						<LabelField title="Reviewer-Name" value={reviewerName} />
					)}
					<LabelField title="Trade-Name" value={tradeName} />
					<LabelField title="Generic-Name" value={genericName} />
					<LabelField title="Pharmacology" value={pharmacology} />
				</div>

				<div className="flex justify-center">
					{!hideButton &&
						<TextButton to={to} buttonType={buttonType ? buttonType : "full"}>
							{buttonTitle}
						</TextButton>
					}
				</div>
			</div>
		</CardContainer>
	);
}
