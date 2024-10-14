import Image from "next/image";
import Logo from "@/assets/images/logo-primary.svg";
import { IconButton, Typography } from "@mui/material";
import MUlogoutIcon from "@mui/icons-material/Logout";
import { Allerta_Stencil } from "next/font/google";

const allertaStencil = Allerta_Stencil({
	subsets: ["latin"],
	variable: "--font-allerta-stencil",
	weight: "400",
});
export default function ashrafLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<header className="flex justify-between fixed top-0 left-0 right-0 p-4">
				<div
					className={`${allertaStencil.className} flex gap-3 items-center text-xl md:text-4xl`}
				>
					<Image src={Logo} alt="logo" width={50} height={50} />
					<Typography variant="inherit" component="h1" color="primary">
						Drug Checker Eg
					</Typography>
				</div>
				<IconButton color="primary">
					<MUlogoutIcon sx={{ width: "2.5rem", height: "2.5rem" }} />
				</IconButton>
			</header>
			{children}
		</div>
	);
}
