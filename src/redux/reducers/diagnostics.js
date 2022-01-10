const initialState = {
	data: [],
	// selectedQuiz: null,
	// from_page: null,
	// complaints_from_page: null,
    // quiz: []
}

export default function diagnosticsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_DIAGNOSTICS':
			return { ...state, data: payload }
		default:
			return state
	}
}
