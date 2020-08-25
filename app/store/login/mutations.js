export default {
	setCurrentUser(state, user){
		state.currentUser.username = user.username;
		state.currentUser.nickname = user.nickname;
		state.currentUser.status = user.status;
	}
}