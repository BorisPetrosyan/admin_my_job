const initialState = {
	data: [],
	selectedCatalog: null,
	from_page: null,
	complaints_from_page: null
}

export default function catalogReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_CATALOG':
			return { ...state, data: payload }
		case 'SET_CATALOG_FROM_PAGE':
			return { ...state, from_page: payload }
		case 'SET_SELECTED_CATALOG':
			return { ...state, selectedCatalog: payload }
		case 'UPDATE_CATALOG_IMAGE':
			let selectedCatalog = { ...state.selectedCatalog }
			selectedCatalog.image = payload
			return { ...state, selectedCatalog }
		case 'SET_CATALOG_COMPLAINTS':
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
