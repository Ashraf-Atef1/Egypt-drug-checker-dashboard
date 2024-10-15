import InformationLabel from "@/components/review/information-label/InformationLabel.component";
import ActionButton from "@/components/reviews/action-button/ActionButton.component";
import ProfileCard from "@/components/shared/profile-card/ProfileCard.component";
import { getReviewData } from "@/lib/api/review-action/reviewAction.route";
import { Typography } from "@mui/material";

export default async function Page({
	searchParams,
}: {
	searchParams: { reviewId: string };
}) {
	const reviewData = await getReviewData(searchParams.reviewId);
	const { userId, tradeName, suggestion } = reviewData.data[0];

	console.log(userId);
	return (
		<section className="flex flex-col gap-6">
			<div>
				<Typography variant="h6" component="h4" fontWeight="bold">
					User information:
				</Typography>
				<ProfileCard
					userName={`${userId.firstName} ${userId.lastName}`}
					userImageSrc={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user-image/${userId.userImage}`}
					userType={userId.userType}
					reviewedDrugs={userId.totalReviews}
					acceptedDrugs={userId.acceptedReviews}
					rejectedReviews={userId.rejectedReviews}
					earnedCoins={userId.totalCoinsEarned}
					email={userId.email}
					// phone="+20108951235"
				/>
			</div>
			<main className="flex flex-col gap-4">
				<Typography variant="h6" component="h4" fontWeight="bold">
					Drug information:
				</Typography>
				<div className="grid md:grid-cols-[auto_1fr] gap-4">
					<InformationLabel title="Trade name">
						<Typography variant="h6" component="p">
							{tradeName.tradeName}
						</Typography>
					</InformationLabel>
					<InformationLabel title="Generic Name">
						<Typography variant="h6" component="p">
							{suggestion.genericName}
						</Typography>
					</InformationLabel>
					<InformationLabel title="Pharmacology">
						<Typography variant="h6" component="p">
							{tradeName.pharmacology}
						</Typography>
					</InformationLabel>
					<InformationLabel title="Route">
						<Typography variant="h6" component="p">
							{suggestion.route}
						</Typography>
					</InformationLabel>
					<InformationLabel title="Company">
						<Typography variant="h6" component="p">
							{suggestion.company}
						</Typography>
					</InformationLabel>
					<InformationLabel title="Description">
						<Typography variant="h6" component="p">
							{suggestion.moreInformation}
						</Typography>
					</InformationLabel>
				</div>
				<div className="flex gap-4">
					<ActionButton
						id={searchParams.reviewId}
						value="Reject"
						color="info"
					/>
					<ActionButton id={searchParams.reviewId} value="Accept" />
				</div>
			</main>
		</section>
	);
}
