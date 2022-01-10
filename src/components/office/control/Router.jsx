import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { t_get_all_groups, t_get_all_tasks } from '../../../redux/tracks'

import Control from './'
import AddGroup from './AddGroup'
import EditGroup from './EditGroup'
import Group from './Group'
import Task from './Task'
import TaskEdit from './TaskEdit'
// import EditCompany from './Edit'
import AddUsers from '../../common/AddUsers'

class Router extends PureComponent {
	componentDidMount() {
		this.props.loadAllGroups()
		this.props.loadAllTasks()
	}

	render() {
		return (
			<Switch>
				<Route exact path="/control" component={Control} />
				<Route path="/control/create_group" component={AddGroup} />
				<Route path="/control/edit_group" component={EditGroup} />
				<Route path="/control/group_info" component={Group} />
				<Route path="/control/add_group_users" component={AddUsers} />
				<Route path="/control/task" component={Task} />
				<Route path="/control/edit_task" component={TaskEdit} />
			</Switch>
		)
	}
}

const mapStateToProps = state => ({
	// service: state.service,
	// dialogs: state.dialogs,
	// profile: state.profile
})
const mapDispatchToProps = dispatch => ({
	loadAllGroups: payload => {
		dispatch(t_get_all_groups(payload))
	},
	loadAllTasks: payload => {
		dispatch(t_get_all_tasks(payload))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Router)
