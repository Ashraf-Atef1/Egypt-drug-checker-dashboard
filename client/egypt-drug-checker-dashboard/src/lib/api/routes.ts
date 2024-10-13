const routes = {
	login: "/api/v1/auth/login",
	signUp: "/api/v1/auth/signup",
	logout: "/api/v1/auth/logout",
	home: "/api/v1/home",
	myData: "/api/v1/auth/",
	data: "/api/v1/auth/",
	changeImage: "/api/v1/auth/change-image",
	deleteImage:"/api/v1/auth/delete-image",
	leaderBoard: "/api/v1/users",
	users: "/api/v1/users",
	drugsReview: "/api/v1/drugs-information/search",
	sendReview: "/api/v1/drugs-reviews",
	reviews: "/api/v1/drugs-reviews",
	myReviews: "/api/v1/drugs-reviews/me",
	store: "/api/v1/store",
	buyItem: "/api/v1/store/buy",
	setFrame: "/api/v1/auth/set-frame",
};

export default function route(name: keyof typeof routes) {
	return process.env.NEXT_PUBLIC_API_URL + routes[name];
}
