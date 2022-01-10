import { languages } from '../../constants'

const initialState = {
	language: localStorage.getItem('language') || languages[0],
	data: null
}

export default function profileReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case 'SET_PROFILE':
			return { ...state, data: payload }

		default:
			return state
	}
}
