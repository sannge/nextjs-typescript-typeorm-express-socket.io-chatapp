import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import ChatroomReducer from "./ChatroomReducer";
import MessagesReducer from "./MessagesReducer";

const rootReducer = combineReducers({
	auth: AuthReducer,
	chatroom: ChatroomReducer,
	messagesReducer: MessagesReducer,
});

export default rootReducer;
