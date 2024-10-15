import ReviewPage from "@/components/review/Review.page";

export default function Review({
	searchParams,
	params: { pageNumber },
}: {
	searchParams: { tradeName?: string };
	params: { pageNumber: string };
}) {
	return <ReviewPage pageNumber={pageNumber} searchParams={searchParams} />;
}
