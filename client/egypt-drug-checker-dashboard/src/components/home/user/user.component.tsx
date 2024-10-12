import UserAvatar from "@/components/shared/user-avatar/UserAvatar.component";
import { Iuser } from "./user.model";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function User({ name, userType, src, frameName }: Iuser) {
	return (
		<Link className="flex flex-col items-center" href="">
			<UserAvatar
				src={src}
				frameName={frameName}
				alt={name}
				size={100}
			/>
			<div className="flex flex-col items-center">
				<Typography variant="h6" component="h4">
					{name}
				</Typography>
				<Typography variant="subtitle1" component="p" className="text-disable">
					{userType}
				</Typography>
			</div>
		</Link>
	);
}
