"use client";
import UserAvatar from "@/components/shared/user-avatar/UserAvatar.component";
import { fonts } from "@/utils/theme/fonts";
import MUtypography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toggleMenu } from "@/lib/store/drop-menu/DropMenu.slice";
import { useEffect } from "react";
import { getMyData } from "@/lib/api/user/user.router";
import { setUser } from "@/lib/store/user/user.slice";

export default function Profile() {
	const user = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const handleClick = () => {
		dispatch(toggleMenu("profile"));
	};
	useEffect(() => {
		getMyData().then(({ user }) => {
			dispatch(setUser(user));
		});
	}, [dispatch]);
	return (
		<div
			className="header-drop-menu flex items-center gap-2 cursor-pointer"
			onClick={handleClick}
		>
			<UserAvatar
				src={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user-image/${user.userImage}`}
				frameName={String(user.currentFrame)}
				alt={String(user.firstName)}
				size={50}
			/>
			<MUtypography variant="h6" fontWeight={fonts.weight.bold}>
				{user.firstName}
			</MUtypography>
			<ExpandMoreIcon color="primary" fontSize="large" />
		</div>
	);
}
