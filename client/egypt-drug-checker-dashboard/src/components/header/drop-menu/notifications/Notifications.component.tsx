import Link from "next/link";
import MUarrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Divider as MUdivider, Typography } from "@mui/material";
import { fonts } from "@/utils/theme/fonts";

export default function Notifications() {
	return (
		<div
			className="w-60 flex flex-col gap-3 items-center p-2 overflow-y-auto"
			style={{
				maxHeight: "40vh",
			}}
		>
			<Typography
				variant="h6"
				component="h5"
				fontWeight={fonts.weight.bold}
				color="primary"
			>
				Notifications
			</Typography>
			<div className="w-full flex flex-col gap-2">
				<Typography noWrap>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
					perspiciatis dolorem. Nostrum quasi unde nemo perspiciatis voluptatem
					officia aperiam veniam praesentium, laborum atque temporibus vero
					fuga, dolorem quae fugit illo.
				</Typography>
				<MUdivider />
				<Typography noWrap>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
					perspiciatis dolorem. Nostrum quasi unde nemo perspiciatis voluptatem
					officia aperiam veniam praesentium, laborum atque temporibus vero
					fuga, dolorem quae fugit illo.
				</Typography>
				<MUdivider />
				<Typography noWrap>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
					perspiciatis dolorem. Nostrum quasi unde nemo perspiciatis voluptatem
					officia aperiam veniam praesentium, laborum atque temporibus vero
					fuga, dolorem quae fugit illo.
				</Typography>
				<MUdivider />
				<Typography noWrap>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
					perspiciatis dolorem. Nostrum quasi unde nemo perspiciatis voluptatem
					officia aperiam veniam praesentium, laborum atque temporibus vero
					fuga, dolorem quae fugit illo.
				</Typography>
				<MUdivider />
			</div>
			<Link href="/notifications">
				<Typography
					variant="subtitle1"
					component="span"
					fontWeight={fonts.weight.bold}
					className="text-2xl font-semibold text-primary"
				>
					Show more
					<MUarrowForwardIosIcon color="primary" />
				</Typography>
			</Link>
		</div>
	);
}
