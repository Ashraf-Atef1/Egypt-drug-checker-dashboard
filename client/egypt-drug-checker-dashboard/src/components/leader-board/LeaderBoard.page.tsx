import UserCard from "@/components/leader-board/user-card/UserCard.component";
import PageCounter from "@/components/shared/page-counter/PageCounter.component";
import { IleaderBoard } from "./LeaderBoard.model";
import { getLeaderBoard } from "@/lib/api/leader-board/leaderBoard.router";
import PaginationBar from "../shared/pagination-bar/PaginationBar.component";
import { type Iuser } from "./LeaderBoard.model";
export default async function LeaderBoardPage({ pageNumber }: IleaderBoard) {
	const users = await getLeaderBoard(pageNumber);
	const { totalItems, totalPages, currentPage } = users.pagination;
	console.log(users);
	console.log(pageNumber);
	return (
		<section className="flex flex-col gap-6">
			<PageCounter title="Total users" value={totalItems} />
			<main className="flex flex-col gap-4">
				{users.data.map((user: Iuser, index:number) => (
					<UserCard
						key={index}
						name={`${user.firstName} ${user.lastName}`}
						userType={user.userType}
						currentFrame={user.currentFrame}
						imageSrc={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user-image/${user.userImage}`}
						rank={(+pageNumber - 1) * 6 + index + 1}
						reviewCount={user.totalReviews}
						acceptedReviewCount={user.acceptedReviews}
						earnedCoins={user.totalCoinsEarned}
					/>
				))}
			</main>
			<PaginationBar pageNumber={currentPage} totalPages={totalPages} />
		</section>
	);
}
