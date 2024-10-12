import CardContainer from "@/components/shared/card-container/CardContainer.component";
import ContentContainer from "../content-container/ContentContainer.component";
import User from "../user/user.component";
import { Iusers } from "./users.model";
export default function Users({ users }: Iusers) {
	console.log(users);
	return (
		<ContentContainer title="Leader-board members" to="/leader-board">
			<CardContainer>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 p-4 gap-3">
					{users.map((user, index) => (
						<User
							key={index}
							src={
								process.env.NEXT_PUBLIC_API_URL +
								"/api/v1/auth/user-image/" +
								user.src
							}
							frameName={user.frameName ?? ""}
							userType={user.userType}
							name={user.name}
						/>
					))}
				</div>
			</CardContainer>
		</ContentContainer>
	);
}
