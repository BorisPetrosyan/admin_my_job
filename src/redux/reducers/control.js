const initialState = {
	groups: null,
	selectedGroup: null,
	groupUsers: [],
	tasks: [],
	selectedTask: null,
	newGroup: {
		img: null
	}
}

export default function controlReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case 'SET_ALL_GROUPS':
			return { ...state, groups: payload }
		case 'SET_ALL_TASKS':
			return { ...state, tasks: payload }
		case 'SET_SELECTED_GROUP':
			return { ...state, selectedGroup: payload }
		case 'SELECT_TASK':
			return { ...state, selectedTask: payload }
		case 'SET_NEW_GROUP':
			return { ...state, newGroup: payload }
		case 'UPDATE_TASK':
			let newTask = state.tasks.find(t => t._id === payload.task_id)
			let newTasks = [...state.tasks]
			let index = newTasks.findIndex(t => t._id === payload.task_id)
			newTask = {
				...newTask,
				deadline: payload.deadline,
				description: payload.description,
				status: payload.status
			}
			newTasks.splice(index, 1, newTask)
			return { ...state, selectedTask: newTask, tasks: newTasks }

		default:
			return state
	}
}
