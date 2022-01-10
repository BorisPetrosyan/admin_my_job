const initialState = {
	data: [],
}

export default function diagnosticsReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_POINTS':
			return { ...state, data: payload }
		default:
			return state
	}
}
