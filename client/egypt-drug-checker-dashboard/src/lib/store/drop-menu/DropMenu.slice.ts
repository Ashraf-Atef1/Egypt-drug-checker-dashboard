import { createSlice } from "@reduxjs/toolkit";
import { IinitialState } from "./DropMenu.model";

const initialState: IinitialState = {
	isOpen: false,
	currentMenu: null,
};

const dropMenuSlice = createSlice({
	name: "dropMenu",
	initialState,
	reducers: {
		toggleMenu(state, action) {
			if (state.isOpen && state.currentMenu === action.payload) {
				state.isOpen = false;
				state.currentMenu = null;
			} else {
				state.isOpen = true;
				state.currentMenu = action.payload;
			}
		},
		closeMenu(state) {
			state.isOpen = false;
			state.currentMenu = null;
		},
	},
});

export const { toggleMenu, closeMenu } = dropMenuSlice.actions;
export default dropMenuSlice.reducer;
