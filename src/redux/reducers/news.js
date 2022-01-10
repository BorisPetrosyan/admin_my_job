const initialState = {
	news: null,
	newsSources: null,
	selectedNews: null,
	sourceUsers: [],
	newsObject: {
		name: '',
		users: [],
		departments: [],
		tags: [],
		companies_list: [],
		image: null
	},
	selectedSource: null
}

export default function newsReducer(state = initialState, { type, payload }) {
	let newNews, index, newsSources
	switch (type) {
		case 'SET_ALL_NEWS':
			return {
				...state,
				news: payload.news,
				newsSources: payload.newsSources
			}
		case 'SELECT_NEWS':
			return { ...state, selectedNews: payload }
		case 'SELECT_NEWS_SOURCE':
			return { ...state, selectedSource: payload }
		case 'SET_NEWS_OBJECT':
			return { ...state, newsObject: payload }
		case 'SET_SOURCE_USERS':
			let newSourceUsers = [...state.sourceUsers]
			if (payload !== null) {
				if (payload instanceof Array) {
					newSourceUsers = payload
				} else {
					if (newSourceUsers.includes(payload)) {
						newSourceUsers = newSourceUsers.filter(
							p => p !== payload
						)
					} else {
						newSourceUsers.push(payload)
					}
				}
			} else {
				newSourceUsers = []
			}
			return { ...state, sourceUsers: newSourceUsers }
		case 'UPDATE_NEWS':
			newNews = [...state.news]
			index = newNews.findIndex(n => n._id === payload.news_id)
			newNews[index].text = payload.text
			newNews.splice(index, 1, newNews[index])
			return { ...state, news: newNews }
		case 'DELETE_NEWS':
			newNews = [...state.news]
			newNews = newNews.filter(n => n._id !== payload)
			return { ...state, news: newNews, selectedNews: null }
		case 'DELETE_NEWS_SOURCE':
			newsSources = [...state.newsSources]
			newsSources = newsSources.filter(s => s._id !== payload.source_id)
			return { ...state, newsSources }
		case 'ADD_NEWS_SOURCE':
			newsSources = [...state.newsSources]
			index = newsSources.findIndex(s => s._id === payload._id)
			if (index !== -1) {
				newsSources.splice(index, 1, payload)
			} else {
				newsSources.push(payload)
			}
			return { ...state, newsSources }
		case 'ADD_NEWS':
			newNews = [...state.news]
			newNews.push(payload)
			return { ...state, news: newNews }
		case 'DELETE_COMMENT':
			newNews = [...state.news]
			index = newNews.findIndex(n => n._id === payload.news_id)
			newNews[index].comments = newNews[index].comments.filter(
				c => c._id !== payload.comment_id
			)
			newNews.splice(index, 1, newNews[index])
			return { ...state, news: newNews }

		default:
			return state
	}
}
