import CardContainer from "@/components/shared/card-container/CardContainer.component";
import { IuserCard } from "./UserCard.model";
import MUtypography from "@mui/material/Typography";
import UserAvatar from "@/components/shared/user-avatar/UserAvatar.component";
import { fonts } from "@/utils/theme/fonts";
import Count from "../../shared/count/count.component";
import Rank1 from "@/assets/images/rank1.png";
import Rank2 from "@/assets/images/rank2.png";
import Rank3 from "@/assets/images/rank3.png";
import Image from "next/image";

const ranks = [Rank1, Rank2, Rank3];

export default function UserCard({
	rank,
	name,
	userType,
	imageSrc,
	reviewCount,
	acceptedReviewCount,
	earnedCoins,
	currentFrame,
}: IuserCard) {
	let rankComponent;

	if (rank <= 3) {
		rankComponent = <Image src={ranks[rank - 1]} alt={`rank-${rank}`} />;
	} else {
		rankComponent = (
			<MUtypography
				variant="inherit"
				component="span"
				fontWeight={fonts.weight.bold}
				color="primary"
			>
				{rank}
			</MUtypography>
		);
	}
	return (
		<CardContainer>
			<div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between py-6">
				<div className="flex flex-grow justify-evenly items-center gap-4 text-4xl sm:text-6xl">
					<div className="min-w-16 flex justify-center">{rankComponent}</div>
					<div className="flex flex-grow items-center gap-6">
						<UserAvatar
							src={imageSrc}
							alt={name}
							frameName={currentFrame}
							size={85}
						/>
						<div className="text-sm sm:text-xl">
							<MUtypography
								variant="inherit"
								component="h3"
								fontWeight={fonts.weight.bold}
							>
								{name}
							</MUtypography>
							<MUtypography
								variant="subtitle1"
								component="p"
								className="text-disable"
							>
								{userType}
							</MUtypography>
						</div>
					</div>
				</div>
				<div className="flex flex-grow justify-evenly items-center text-xs sm:text-xl">
					<Count title="Reviewed drugs" count={reviewCount} />
					<Count title="Accepted reviews" count={acceptedReviewCount} />
					<Count title="Earned coins" count={earnedCoins} />
				</div>
			</div>
		</CardContainer>
	);
}
