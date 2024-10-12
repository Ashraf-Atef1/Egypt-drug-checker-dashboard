import CardContainer from "../card-container/CardContainer.component";
import UserAvatar from "../user-avatar/UserAvatar.component";
import TextButton from "../text-button/TextButton.component";
import MUtypography from "@mui/material/Typography";
import { Email, Phone } from "@mui/icons-material";
import Count from "../count/count.component";
import { type IprofileCard } from "./ProfileCard.model";
import { fonts } from "@/utils/theme/fonts";

export default function ProfileCard({
	userName,
	userImageSrc,
	userFrameSrc,
	userType,
	userId,
	reviewedDrugs,
	acceptedDrugs,
	rejectedReviews,
	earnedCoins,
	email,
	phone,
	editable,
	hideHoveringBorder,
	buttonLink
}: IprofileCard) {
	const contactElements = (
		<>
			{email && (
				<div className="justify-center lg:justify-start xl:justify-center flex items-center gap-1">
					<Email color="primary" fontSize="large" />
					<MUtypography>{email}</MUtypography>
				</div>
			)}
			{phone && (
				<div className="justify-center lg:justify-start xl:justify-center flex items-center gap-1">
					<Phone color="primary" fontSize="large" />
					<MUtypography>{phone}</MUtypography>
				</div>
			)}

			{editable && (
				<div className="hidden lg:block ">
					<TextButton buttonType="outlined" to={buttonLink}>Edit profile</TextButton>
				</div>
			)}
		</>
	);
	console.log("userImageSrc", userImageSrc);
	return (
		<CardContainer hideHoveringBorder={hideHoveringBorder ? true : undefined}>
			<div className="flex flex-col gap-6 lg:flex-row justify-between  p-4 bg-white shadow-lg rounded-lg">
				<div className="flex flex-col md:flex-row md:justify-center lg:justify-start gap-12 flex-grow">
					<div className="flex flex-col md:flex-row  justify-start items-center gap-6">
						<div>
							<UserAvatar
								src={userImageSrc}
								frameName={userFrameSrc}
								alt={userName}
								size={85}
							/>
						</div>
						<div className="text-sm sm:text-xl">
							<MUtypography
								variant="h5"
								component="h3"
								fontWeight={fonts.weight.bold}
							>
								{userName}
							</MUtypography>
							<MUtypography
								variant="subtitle1"
								component="p"
								className="text-gray-600"
							>
								{userType}
							</MUtypography>
							{userId && (
								<MUtypography variant="caption" color="textSecondary">
									ID: {userId}
								</MUtypography>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between py-6 lg:hidden">
						{contactElements}
					</div>
				</div>
				<div className="flex flex-col flex-grow text-xs sm:text-xl gap-1">
					<div className="hidden lg:flex gap-20 justify-between py-6 ">
						{contactElements}
					</div>
					<div className="grid grid-cols-2 gap-6 lg:flex justify-between py-6">
						<Count title="Reviewed drugs" count={reviewedDrugs} />
						<Count title="Accepted reviews" count={acceptedDrugs} />
						<Count
							title="Rejected reviews"
							count={rejectedReviews}
							// countDen={dailyTarget}
						/>
						<Count title="Earned coins" count={earnedCoins} />
					</div>
					{editable && (
						<div className="lg:hidden flex justify-center">
							<TextButton className="lg:hidden" buttonType="outlined" to={buttonLink}>
								Edit profile
							</TextButton>
						</div>
					)}
				</div>
			</div>
		</CardContainer>
	);
}
