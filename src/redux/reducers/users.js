const initialState = {
	data: [],
	selectedUser: null,
	from_page: null,
	complaints_from_page: null
}

export default function usersReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_USERS':
			return { ...state, data: payload }
		case 'SET_USERS_FROM_PAGE':
			return { ...state, from_page: payload }
		case 'SET_SELECTED_USER':
			return { ...state, selectedUser: payload }
		case 'UPDATE_USER_IMAGE':
			let selectedUser = { ...state.selectedUser }
			selectedUser.image = payload
			return { ...state, selectedUser }
		case 'SET_USERS_COMPLAINTS':
			return { ...state, complaints_from_page: payload }
		case 'UPDATE_COMPLAINT_STATUS':
			let complaints_from_page = { ...state.complaints_from_page }
			let complaint = complaints_from_page.docs.find(
				(c) => c._id === payload.complaint_id
			)
			let index = complaints_from_page.docs.findIndex(
				(c) => c._id === payload.complaint_id
			)
			complaint.status = payload.status
			complaints_from_page.docs.splice(index, 1, complaint)
			return { ...state, complaints_from_page }

		default:
			return state
	}
}
