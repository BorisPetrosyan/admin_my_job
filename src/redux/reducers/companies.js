const initialState = {
	data: null,
	selectedCompany: null,
	newCompany: {
		parent: -1,
		name: ''
	},
	companyUsers: [],
	toggleSort: false
}

export default function companiesReducer(
	state = initialState,
	{ type, payload }
) {
	// let newData
	switch (type) {
		case 'SET_COMPANIES':
			return { ...state, data: payload }
		case 'SET_SELECTED_COMPANY':
			return { ...state, selectedCompany: payload }
		case 'SET_NEW_COMPANY':
			return { ...state, newCompany: payload }
		case 'SET_COMPANY_USERS':
			return { ...state, companyUsers: payload }
		case 'UPDATE_COMPANY_NAME':
			let newData = [...state.data]
			let index = state.data.findIndex(c => c._id === payload.company_id)
			newData[index].name = payload.name
			return {
				...state,
				data: newData,
				selectedCompany: state.selectedCompany
					? { ...state.selectedCompany, name: payload.name }
					: null
			}
		case 'SORTED_COMPANY_USERS':
			let updateData = state.selectedCompany.users.sort((a, b) => {
				if (state.toggleSort) {
					return a[payload.field] > b[payload.field] ? 1 : -1
				} else {
					return b[payload.field] > a[payload.field] ? 1 : -1
				}
			});

			return {
				...state,
				selectedCompany: {
					...state.selectedCompany,
					users: updateData
				},
				toggleSort: !state.toggleSort
			}
		// case 'ADD_NEW_COMPANY':
		// 	newData = [...state.data]
		// 	newData.push(payload)
		// 	return { ...state, data: newData }
		// case 'DELETE_COMPANY':
		// 	newData = [...state.data]
		// 	newData = newData.filter(
		// 		c =>
		// 			c._id !== payload ||
		// 			(c.company && c.company._id !== payload)
		// 	)
		// 	return { ...state, data: newData, selectedCompany: null }

		default:
			return state
	}
}
