import { type IstatisticsCard } from "./StatisticsCard.model";
import CardContainer from "@/components/shared/card-container/CardContainer.component";
import { Typography } from "@mui/material";
import { fonts } from "@/utils/theme/fonts";
import colors from "@/utils/theme/colors";

const size = 120;
const Radius = size / 2 - 10;
const DashArray = 2 * Math.PI * Radius;
const StrokeWidth = 10;

export default function StatisticsCard({
	title,
	percent,
	value,
	total,
}: IstatisticsCard) {
	const DashOffset = DashArray * ((100 - percent) / 100);
	return (
		<CardContainer>
			<div className="flex items-center px-4 py-8 gap-10">
				<div className="flex-1 flex flex-col gap-4">
					<Typography
						variant="h6"
						component="h4"
						fontWeight={fonts.weight.bold}
					>
						{title}
					</Typography>
					<Typography
						variant="h5"
						component="p"
						fontWeight={fonts.weight.extraBold}
					>
						{value}/{total}
					</Typography>
					{/* <div className="flex gap-3 items-center">
						<span className="font-extrabold text-xl">{percent}%</span>
						<SwitchAccessShortcutAddIcon
							sx={{ transform: "rotateY(180deg)" }}
							color="primary"
							fontSize="large"
						/>
					</div> */}
				</div>
				<div className="relative">
					<svg
						width={size}
						height={size}
						viewBox={`0 0 ${size} ${size}`}
						style={{ transform: "rotate(-90deg)" }}
					>
						<circle
							r={Radius}
							cx={size / 2}
							cy={size / 2}
							fill="transparent"
							stroke={colors.secondary}
							strokeWidth={StrokeWidth}
						></circle>
						<circle
							r={Radius}
							cx={size / 2}
							cy={size / 2}
							fill="transparent"
							stroke={colors.primary}
							strokeLinecap="round"
							strokeWidth={StrokeWidth}
							strokeDasharray={DashArray}
							strokeDashoffset={DashOffset}
						></circle>
					</svg>
					<span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-primary font-extrabold text-xl">
						{percent}%
					</span>
				</div>
			</div>
		</CardContainer>
	);
}
