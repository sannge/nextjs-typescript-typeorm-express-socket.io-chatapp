export interface UserInfoType {
	userInfo: {
		name: string;
	};
}

export interface User {
	username: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

export interface Chatroom {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}
