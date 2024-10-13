import { combineReducers } from "@reduxjs/toolkit";
import DropMenuReducer from "./drop-menu/DropMenu.slice";
import UserReducer from "./user/user.slice";

export const rootReducer = combineReducers({
	dropMenu: DropMenuReducer,
	user: UserReducer,
});
