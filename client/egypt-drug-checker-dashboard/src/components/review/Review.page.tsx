import ReviewCard from "@/components/shared/review-card/ReviewCard.component";
import PageCounter from "@/components/shared/page-counter/PageCounter.component";
import { getDrugsReview } from "@/lib/api/review/review.router";
import { Ireview } from "./Review.model";
import PaginationBar from "../shared/pagination-bar/PaginationBar.component";

export default async function ReviewPage({
	pageNumber,
	searchParams,
}: Ireview) {
	const drugs = await getDrugsReview(pageNumber, searchParams);
	const { totalItems, totalPages, currentPage } = drugs.pagination;
	return (
		<section className="flex flex-col gap-6">
			<PageCounter title="Total drugs reviews" value={totalItems} />
			<main className="flex flex-col gap-4">
				{drugs.data.map((drug, index) => (
					<ReviewCard
						key={index}
						buttonType="full"
						tradeName={drug.tradeName}
						genericName={drug.genericName}
						pharmacology={drug.pharmacology}
						buttonTitle=" Review"
						to={{
							pathname: `/review/edit/`,
							query: { tradeName: drug.tradeName },
						}}
					/>
				))}
			</main>
			<PaginationBar pageNumber={currentPage} totalPages={totalPages} />
		</section>
	);
}
