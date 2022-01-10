const initialState = localStorage.getItem('auth') !== null

export default function authReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_AUTH':
			return payload
		
		default:
			return state
	}
}
