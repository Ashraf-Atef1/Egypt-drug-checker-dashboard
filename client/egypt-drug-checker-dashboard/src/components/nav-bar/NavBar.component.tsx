"use client";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import MUlogoutIcon from "@mui/icons-material/Logout";
import MUhomeIcon from "@mui/icons-material/Home";
import MUchecklistIcon from "@mui/icons-material/Checklist";
import MUmilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import MUlocalMallIcon from "@mui/icons-material/LocalMall";
import MUateReviewIcon from "@mui/icons-material/RateReview";
import MUmanageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NavLinkContainer from "./nav-link-container/NavLinkContainer.component";
import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import MUiconButton from "@mui/material/IconButton";
import { logOut } from "@/lib/api/logout/logout.router";
import { useRouter } from "next/navigation";

const UserLinks = [
	{
		to: "/home",
		button: <MUhomeIcon sx={{ width: "100%", height: "100%" }} />,
	},
	{
		to: "/review",
		button: <MUchecklistIcon sx={{ width: "100%", height: "100%" }} />,
	},
	{
		to: "/leader-board",
		button: <MUmilitaryTechIcon sx={{ width: "100%", height: "100%" }} />,
	},
	{
		to: "/store",
		button: <MUlocalMallIcon sx={{ width: "100%", height: "100%" }} />,
	},
];
const DoctorLinks = [
	{
		to: "/reviews",
		button: <MUateReviewIcon sx={{ width: "100%", height: "100%" }} />,
	},
];
const AdminOnlyLinks = [
	{
		to: "/users",
		button: <MUmanageAccountsIcon sx={{ width: "100%", height: "100%" }} />,
	},
];

export default function NavBar() {
	const { userType } = useAppSelector((state) => state.user);
	const router = useRouter();
	function handelLogOut() {
		logOut().then(() => {
			router.push("/login");
		});
	}
	return (
		<div className="fixed lg:relative lg:w-36 top-auto left-auto bottom-0 right-0 w-full z-50">
			<div className="flex flex-col items-center justify-between bg-primary gap-8 rounded-xl w-full min-h-full">
				<Link className="p-5 hidden lg:block" href="/home">
					<Image src={Logo} alt="logo" width={90} height={90} />
				</Link>
				<div className="flex lg:flex-col justify-between lg:gap-4 w-full">
					{UserLinks.map((link, index) => (
						<NavLinkContainer key={index} to={link.to}>
							{link.button}
						</NavLinkContainer>
					))}

					{userType !== "user" &&
						DoctorLinks.map((link, index) => (
							<NavLinkContainer
								key={index}
								to={link.to}
								className="hidden lg:block"
							>
								{link.button}
							</NavLinkContainer>
						))}
					{userType === "admin" &&
						AdminOnlyLinks.map((link, index) => (
							<NavLinkContainer
								key={index}
								to={link.to}
								className="hidden lg:block"
							>
								{link.button}
							</NavLinkContainer>
						))}
				</div>
				<div className="p-5 hidden lg:block">
					<MUiconButton onClick={() => handelLogOut()}>
						<MUlogoutIcon
							className="text-white"
							sx={{ width: "4rem", height: "4rem" }}
						/>
					</MUiconButton>
				</div>
			</div>
		</div>
	);
}
