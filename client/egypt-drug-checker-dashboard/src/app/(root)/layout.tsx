import Header from "@/components/header/Header.component";
import NavBar from "@/components/nav-bar/NavBar.component";

export default function ashrafLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col lg:flex-row h-screen">
			<div className="side-nav-bar p-4 overflow-y-scroll no-scrollbar hidden lg:flex min-w-44">
				<NavBar />
			</div>
			<div className="flex-grow max-h-full overflow-y-scroll px-2 pb-8">
				<Header />
				{children}
			</div>

			<div className="bottom-nav-bar block lg:hidden">
				<NavBar />
			</div>
		</div>
	);
}
