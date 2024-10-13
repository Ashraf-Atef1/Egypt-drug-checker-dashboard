import ReviewCard from "@/components/shared/review-card/ReviewCard.component";
import PageCounter from "@/components/shared/page-counter/PageCounter.component";
import { getReviews } from "@/lib/api/reviews/reviews.router";
import { Ireviews } from "./Reviews.model";
import PaginationBar from "../shared/pagination-bar/PaginationBar.component";
export default async function ReviewsPage({ pageNumber }: Ireviews) {
	const reviews = await getReviews(pageNumber);
	const { totalItems, totalPages, currentPage } = reviews.pagination;
	return (
		<section className="flex flex-col gap-6">
			<PageCounter title="Total drugs reviews" value={totalItems} />
			<main className="flex flex-col gap-4">
				{/* chore enhance definition TO-BE-DONE */}
				{reviews.data.map((review: { userId: { firstName: string, lastName: string }; tradeName: { tradeName: string }; suggestion: { genericName: string, pharmacology: string }; _id: string; }, index: string) => {
					const { userId, tradeName, suggestion, _id: reviewId } = review;
					return (
						<ReviewCard
							key={index}
							buttonType="full"
							reviewerName={`${userId.firstName} ${userId.lastName}`}
							tradeName={tradeName.tradeName}
							genericName={suggestion.genericName}
							pharmacology={suggestion.pharmacology}
							buttonTitle="See the review"
							to={{
								pathname: `/reviews/edit/`,
								query: { reviewId },
							}}
						/>
					);
				})}
			</main>
			<PaginationBar pageNumber={currentPage} totalPages={totalPages} />
		</section>
	);
}
