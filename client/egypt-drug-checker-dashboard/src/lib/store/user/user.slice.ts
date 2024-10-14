import { createSlice } from "@reduxjs/toolkit";
import { Iuser } from "./user.model";

const initialState: Iuser = {
	coins: null,
	email: null,
	firstName: null,
	isVerified: false,
	items: [],
	lastName: null,
	totalCoinsEarned: null,
	acceptedReviews: null,
	rejectedReviews: null,
	userId: null,
	userType: null,
	totalReviews: null,
	currentFrame: null,
	userImage: null
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
		logout() {
			return initialState;
		},
	},
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
