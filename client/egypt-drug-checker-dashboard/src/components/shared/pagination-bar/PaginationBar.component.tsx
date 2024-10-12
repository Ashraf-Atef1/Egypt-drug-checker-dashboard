"use client";
import MUpagination from "@mui/material/Pagination";
import { IpaginationBar } from "./PaginationBar.model";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function PaginationBar({
	pageNumber,
	totalPages,
}: IpaginationBar) {
	const router = useRouter();
	const path = usePathname().split("/").slice(0, -1).join("/");
	const searchParams = useSearchParams();
	const paramsObject = Object.fromEntries(searchParams.entries());
	console.log("searchParams", Object.fromEntries(searchParams.entries()));
	return (
		<div className="flex justify-center">
			<MUpagination
				count={+totalPages}
				page={+pageNumber}
				shape="rounded"
				color="primary"
				size="large"
				onChange={(event, value) => {
					const searchParamsString = new URLSearchParams(
						paramsObject
					).toString();
					router.push(`${path}/${value}?${searchParamsString}`);
				}}
			/>
		</div>
	);
}
