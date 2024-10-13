"use client";
import { IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useAppDispatch } from "@/lib/store/hooks";
import { toggleMenu } from "@/lib/store/drop-menu/DropMenu.slice";

export default function Notifications() {
	const dispatch = useAppDispatch();
	const handleClick = () => {
		dispatch(toggleMenu("notifications"));
	};
	return (
		<IconButton className="header-drop-menu" onClick={handleClick}>
			<NotificationsNoneIcon fontSize="large" color="primary" />
		</IconButton>
	);
}
