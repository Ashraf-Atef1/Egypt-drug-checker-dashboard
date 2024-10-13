import TextButton from "@/components/shared/text-button/TextButton.component";
import MUateReviewIcon from "@mui/icons-material/RateReview";
import MUmanageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
	IconButton as MUiconButton,
	Typography as MUtypography,
} from "@mui/material";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logOut } from "@/lib/api/logout/logout.router";

export default function Profile() {
	const user = useAppSelector((state) => state.user);
	const router = useRouter();
	function handelLogOut() {
		logOut().then(() => {
			router.push("/login");
		});
	}
	return (
		<div
			className="flex flex-col gap-3 p-4 items-center overflow-y-auto"
			style={{
				maxHeight: "40vh",
			}}
		>
			<div className="flex justify-between w-full">
				{["admin", "doctor"].includes(String(user.userType)) && (
					<Link href="/reviews">
						<MUiconButton>
							<MUateReviewIcon fontSize="large" color="primary" />
						</MUiconButton>
					</Link>
				)}
				{user.userType === "admin" && (
					<Link href="/users">
						<MUiconButton>
							<MUmanageAccountsIcon fontSize="large" color="primary" />
						</MUiconButton>
					</Link>
				)}
			</div>
			<MUtypography variant="subtitle1" component="p">
				Hello, {user.firstName}
			</MUtypography>
			<TextButton buttonType="full" to="/profile">
				My profile
			</TextButton>
			<TextButton onClick={() => handelLogOut()} buttonType="outlinedFull">
				Log out
			</TextButton>
		</div>
	);
}
