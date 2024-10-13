import UserAvatar from "@/components/shared/user-avatar/UserAvatar.component";
import { Iuser } from "./user.model";
import MUtypography from "@mui/material/Typography";
import Link from "next/link";

export default function User({ name, userType, src, frameName }: Iuser) {
	return (
		<Link className="flex flex-col items-center" href="">
			<UserAvatar src={src} frameName={frameName} alt={name} size={100} />
			<div className="flex flex-col items-center">
				<MUtypography variant="h6" component="h4">
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
		</Link>
	);
}
