const initialState = {
	data: [],
	selectedQuiz: null,
	from_page: null,
	complaints_from_page: null,
    quiz: []
}

export default function quizesReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_QUIZ':
            console.log(payload, { ...state, data: payload })
			return { ...state, data: payload }
		default:
			return state
	}
}
