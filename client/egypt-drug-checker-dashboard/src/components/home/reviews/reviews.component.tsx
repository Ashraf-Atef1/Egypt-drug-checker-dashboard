import ReviewCard from "@/components/shared/review-card/ReviewCard.component";
import ContentContainer from "../content-container/ContentContainer.component";
import { type Ireviews } from "./reviews.model";
export default function Reviews({ reviews }: Ireviews) {
	console.log(reviews);
	return (
		<ContentContainer title="Drugs to be reviewed" to="/review">
			<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
				{reviews.map((review, index) => (
					<ReviewCard
						key={index}
						buttonType="full"
						tradeName={review.tradeName}
						genericName={review.genericName}
						pharmacology={review.pharmacology}
						buttonTitle=" Review"
						to={{
							pathname: `/review/edit/`,
							query: { tradeName: review.tradeName },
						}}
					/>
				))}
			</div>
		</ContentContainer>
	);
}
