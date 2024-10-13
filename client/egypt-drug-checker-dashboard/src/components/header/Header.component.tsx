import Link from "next/link";
import PageTitle from "../shared/page-title/PageTitle.component";
import Coins from "./coins/Coins.component";
import Notifications from "./notifications/Notifications.component";
import Profile from "./profile/Profile.component";
import Search from "./search/Search.component";
import Logo from "@/assets/images/logo-primary.svg";
import Image from "next/image";
import DropMenu from "./drop-menu/DropMenu.component";

export default function Header() {
	return (
		<header className="sticky top-0 z-30">
			<div className="py-4 lg:px-0 bg-white right-0">
				<div className="flex justify-between gap-4 items-center">
					<Link href="/" className="lg:hidden">
						<Image src={Logo} alt="logo" width={60} height={60} />
					</Link>
					<div className="hidden lg:flex flex-grow gap-4 items-center">
						<PageTitle />
						<Search />
					</div>
					<div className="flex gap-2 items-center justify-end">
						<Coins />
						<div className="hidden lg:block">
							<Notifications />
						</div>
						<Profile />
					</div>
				</div>
				<div className="flex gap-2 lg:hidden mt-3 justify-between">
					<Search />
					<div className="block lg:hidden">
						<Notifications />
					</div>
				</div>
			</div>
			<div className="relative bottom-0">
				<DropMenu />
			</div>
		</header>
	);
}
