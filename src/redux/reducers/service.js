const initialState = {
	loading: null,
	register_step: '1',
	restore_step: '1',
	terms: {
		'1': false,
		'2': false,
		'3': false
	},
	hiddenMenu: false
}

export default function serviceReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case 'SET_LOADING':
			return { ...state, loading: payload }
		case 'SET_REGISTER_STEP':
			return { ...state, register_step: payload }
		case 'SET_RESTORE_STEP':
			return { ...state, restore_step: payload }
		case 'SET_TERMS':
			return {
				...state,
				terms: { ...state.terms, [payload.type]: payload.bool }
			}
		case 'TOGGLE_MENU':
			return { ...state, hiddenMenu: !state.hiddenMenu }

		default:
			return state
	}
}
