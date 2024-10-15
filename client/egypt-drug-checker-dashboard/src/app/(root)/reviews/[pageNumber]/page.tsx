import ReviewsPage from "@/components/reviews/Reviews.page";

export default function Review({
	params: { pageNumber },
}: {
	params: { pageNumber: string };
}) {
	return <ReviewsPage pageNumber={pageNumber} />;
}
