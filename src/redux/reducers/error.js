const initialState = false

export default function errReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_ERROR':
			return payload
		
		default:
			return state
	}
}
