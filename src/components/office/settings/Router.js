import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

// import { t_load_tags } from '../../../redux/tracks'

import Settings from './'
import ClientSettings from './Client'
import Edit from './Edit'
import CreateRole from './CreateRole'
import AddUsers from '../../common/AddUsers'

class SettingsRouter extends PureComponent {
	// componentDidMount() {
	// 	this.props.loadTags()
	// }

	render() {
		return (
			<Switch>
				<Route exact path="/settings" component={Settings} />
				<Route path="/settings/client" component={ClientSettings} />
				<Route path="/settings/edit" component={Edit} />
				<Route path="/settings/add_members" component={AddUsers} />
				<Route path="/settings/create_role" component={CreateRole} />
				<Route path="/settings/edit_role" component={CreateRole} />
			</Switch>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	// loadTags: () => dispatch(t_load_tags())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsRouter)
