"use client";
import TextButton from "@/components/shared/text-button/TextButton.component";
import { IactionButton } from "./ActionButton.model";
import { useRouter } from "next/navigation";
import fetcher from "@/utils/fetcher/fetcher";
import route from "@/lib/api/routes";

export async function acceptReview(reviewId: string) {
	const res = await fetcher(`${route("reviews")}/${reviewId}/approve`, {
		method: "PUT",
	});
	return res;
}

export async function rejectReview(reviewId: string) {
	const res = await fetcher(`${route("reviews")}/${reviewId}/reject`, {
		method: "PUT",
	});
	return res;
}

export default function ActionButton({ id, value, ...props }: IactionButton) {
	const router = useRouter();
	return (
		<TextButton
			onClick={() => {
				if (value === "Accept") acceptReview(id);
				if (value === "Reject") rejectReview(id);
				router.back();
			}}
			buttonType="full"
			{...props}
		>
			{value}
		</TextButton>
	);
}
