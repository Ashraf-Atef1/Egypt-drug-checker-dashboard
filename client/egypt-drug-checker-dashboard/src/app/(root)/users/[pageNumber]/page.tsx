import UsersPage from "@/components/users/users.page";
export const dynamic = "force-dynamic";

export default function users({
	params: { pageNumber },
}: {
	params: { pageNumber: string };
}) {
	return <UsersPage pageNumber={pageNumber} />;
}
