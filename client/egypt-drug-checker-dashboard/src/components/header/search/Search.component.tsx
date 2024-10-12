"use client";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState("");

	function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		router.push("/review/1?tradeName=" + searchValue);
		setSearchValue("");
	}
	return (
		<form
			onSubmit={handelSubmit}
			className="flex-grow relative h-14"
			style={{ maxWidth: "45rem" }}
		>
			<input
				type="search"
				name="search"
				placeholder="search for drugs"
				className="w-full h-full bg-input rounded-xl p-6 pl-10 font-semibold text-lg focus:outline-primary caret-primary"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			<div className="absolute top-0 left-0 h-full flex items-center">
				<IconButton type="submit">
					<SearchIcon color="primary" />
				</IconButton>
			</div>
		</form>
	);
}
