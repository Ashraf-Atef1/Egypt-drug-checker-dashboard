import LeaderBoardPage from "@/components/leader-board/LeaderBoard.page";

export default function LeaderBoard({ params: { pageNumber } }: { params: { pageNumber: string } }) {
	return <LeaderBoardPage pageNumber={pageNumber} />;
}
