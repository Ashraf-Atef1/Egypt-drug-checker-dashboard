"use client";
import colors from "@/utils/theme/colors";
import { InavLinkContainer } from "./NavLinkContainer.model";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinkContainer({
	to,
	children,
	className,
}: InavLinkContainer) {
	const IsActive = usePathname().split("/")[1] === to.slice(1);
	return (
		<Link
			href={to}
			className={`flex lg:block justify-center ${className}`}
			style={{
				color: IsActive ? colors.primary : colors.white,
				backgroundColor: IsActive ? colors.white : colors.primary,
			}}
		>
			<div className="w-4 h-full lg:w-full lg:h-4 bg-primary rounded-tr-full lg:rounded-none lg:rounded-br-full"></div>
			<div className="flex bg-primary flex-col-reverse lg:flex-row">
				<div className=" h-3 lg:w-8 bg-primary"></div>
				<div
					className="rounded-b-full lg:rounded-none lg:rounded-l-full flex-grow p-2"
					style={{
						backgroundColor: IsActive ? colors.white : colors.primary,
					}}
				>
					<div className="w-10 h-10 lg:w-16 lg:h-16">{children}</div>
				</div>
			</div>
			<div className="w-4 h-full lg:w-full lg:h-4 bg-primary rounded-tl-full lg:rounded-none lg:rounded-tr-full"></div>
		</Link>
	);
}
