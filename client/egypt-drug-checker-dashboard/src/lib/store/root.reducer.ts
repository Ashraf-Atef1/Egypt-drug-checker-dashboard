import { combineReducers } from "@reduxjs/toolkit";
import DropMenuReducer from "./drop-menu/DropMenu.slice";

export const rootReducer = combineReducers({
	dropMenu: DropMenuReducer,
});
