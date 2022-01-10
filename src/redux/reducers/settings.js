const initialState = {
	positions: null,
	roles: null,
	selectedRole: {
		item: null,
		client: false
	}
}

export default function settingsReducer(
	state = initialState,
	{ type, payload }
) {
	let arr, index, roles
	switch (type) {
		case 'SET_SETTINGS':
			return {
				...state,
				positions: payload.positions,
				roles: payload.roles
			}
		case 'SELECT_ROLE':
			return {
				...state,
				selectedRole: payload
			}
		case 'CHANGE_ACCESS':
			arr = [...state[payload.type]]
			index = arr.findIndex(i => i._id === payload._id)
			arr[index][payload.field] = payload.value
			return {
				...state,
				[payload.type]: arr
			}
		case 'CHANGE_RIGHTS':
			arr = [...state[payload.type]]
			index = arr.findIndex(i => i._id === payload._id)
			arr[index][payload.field] = payload.value
			return {
				...state,
				[payload.type]: arr
			}
		case 'CHANGE_ROLE_TAGS':
			roles = [...state.roles]
			index = roles.findIndex(i => i._id === payload.role_id)
			roles[index][payload.field] = payload.tags.map(t => t.data)
			return {
				...state,
				roles
			}
		case 'ADD_ROLE':
			roles = [...state.roles]
			index = roles.findIndex(r => r._id === payload._id)
			if (index !== -1) {
				roles.splice(index, 1, payload)
			} else {
				roles.push(payload)
			}
			return {
				...state,
				roles
			}
		case 'DELETE_ROLE':
			arr = [...state[payload.type]]
			index = arr.findIndex(r => r._id === payload._id)
			arr.splice(index, 1)
			return {
				...state,
				[payload.type]: arr
			}

		default:
			return state
	}
}
