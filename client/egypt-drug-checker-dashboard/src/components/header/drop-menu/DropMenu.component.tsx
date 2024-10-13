"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import CardContainer from "@/components/shared/card-container/CardContainer.component";
import Notifications from "./notifications/Notifications.component";
import Profile from "./profile/Profile.component";
import { useEffect } from "react";
import { closeMenu } from "@/lib/store/drop-menu/DropMenu.slice";

export default function DropMenu() {
	const { currentMenu, isOpen } = useAppSelector((state) => state.dropMenu);
	const dispatch = useAppDispatch();
	let menu;
	if (currentMenu === "notifications") {
		menu = <Notifications />;
	} else if (currentMenu === "profile") {
		menu = <Profile />;
	}
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (e.target instanceof HTMLElement) {
				if (!e.target.closest(".header-drop-menu")) {
					dispatch(closeMenu());
					document.removeEventListener("click", handleClick);
				}
			}
		}
		if (isOpen) document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [isOpen, dispatch]);

	return (
		<div
			className="header-drop-menu absolute right-0 top-0"
			style={{
				display: isOpen ? "block" : "none",
			}}
		>
			<CardContainer>{menu}</CardContainer>
		</div>
	);
}
