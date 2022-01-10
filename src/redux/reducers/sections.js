const initialState = {
	data: [],
	selectedSection: null,
	from_page: null,
	complaints_from_page: null,
}

export default function sectionsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_SECTIONS':
            console.log(payload, { ...state, data: payload })
			return { ...state, data: payload }
		default:
			return state
	}
}