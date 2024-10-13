import Reviews from "@/components/home/reviews/reviews.component";
import StatisticsCard from "@/components/home/statistics-card/StatisticsCard.component";
import Users from "@/components/home/users/users.component";
import { getHome } from "@/lib/api/home/home.router";
export async function HomePage() {
	const homeData = await getHome();
	const totalReviews = homeData.ReviewsData.totalReviews;
	const totalDrugs = homeData.ReviewsData.totalDrugs;
	const totalApprovedReviews = homeData.ReviewsData.totalApprovedReviews;
	const totalRejectedReviews = homeData.ReviewsData.totalRejectedReviews;
	const yourRank = homeData.yourRank.yourRank;
	const totalUsers = homeData.yourRank.totalUsers;
	//This logic is to be moved to zod schema
	const users = homeData.leaderBoard.map((user: { userImage: string; currentFrame: string; userType: string; firstName: string; lastName: string; }) => ({
		src: user.userImage,
		frameName: user.currentFrame,
		userType: user.userType,
		name: `${user.firstName} ${user.lastName}`
	}));
	const drugsReviews = homeData.drugsToReview.map((drug: { tradeName: string; genericName: string; pharmacology: string; }) => ({
		tradeName: drug.tradeName,
		genericName: drug.genericName,
		pharmacology: drug.pharmacology,
	  }));
	return (
		<section className="flex flex-col gap-6">
			<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
				<StatisticsCard
					title="Total Reviews"
					percent={Math.ceil((totalReviews / totalDrugs) * 100)}
					value={totalReviews}
					total={totalDrugs}
				/>
				<StatisticsCard
					title="Total Accepted Reviews"
					percent={Math.ceil((totalApprovedReviews / totalReviews) * 100)}
					value={totalApprovedReviews}
					total={totalReviews}
				/>
				<StatisticsCard
					title="Total Rejected Reviews"
					percent={Math.ceil((totalRejectedReviews / totalReviews) * 100)}
					value={totalRejectedReviews}
					total={totalReviews}
				/>
				<StatisticsCard
					title="Your leader-board rank"
					percent={Math.ceil((yourRank / totalUsers) * 100)}
					value={yourRank}
					total={totalUsers}
				/>
			</div>
			<Users users={users}/>
			<Reviews reviews={drugsReviews}/>
		</section>
	);
}
