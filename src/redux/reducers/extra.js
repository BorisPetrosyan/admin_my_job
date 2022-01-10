const initialState = {
	tags: null,
	selectedTag: null
}

export default function extraReducer(state = initialState, { type, payload }) {
	let newTags
	switch (type) {
		case 'SET_ALL_TAGS':
			return { ...state, tags: payload }
		case 'SELECT_TAG':
			return { ...state, selectedTag: payload }
		case 'ADD_TAG':
			newTags = [...state.tags]
			const index = newTags.findIndex(t => t._id === payload._id)
			if (index !== -1) {
				newTags.splice(index, 1, payload)
			} else {
				newTags.push(payload)
			}
			return { ...state, tags: newTags }
		case 'DELETE_TAG':
			newTags = [...state.tags]
			newTags = newTags.filter(t => t._id !== payload.tag_id)
			return { ...state, tags: newTags }
		case 'ADD_NEWS_SOURCE_TO_TAG':
			newTags = [...state.tags]
			let tags_ids = payload.tags.map(t => t._id)
			if (tags_ids.length > 0) {
				newTags.forEach(t => {
					if (tags_ids.includes(t._id)) {
						t.sources.push(payload)
					}
				})
			}
			return { ...state, tags: newTags }

		default:
			return state
	}
}
