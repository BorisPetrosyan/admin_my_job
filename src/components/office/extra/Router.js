import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

// import { t_load_tags } from '../../../redux/tracks'

import Extra from './'
import AddTag from './AddTag'
import EditTag from './EditTag'
import AddUsers from '../../common/AddUsers'

class ExtraRouter extends PureComponent {
	// componentDidMount() {
	// 	this.props.loadTags()
	// }
	render() {
		return (
			<Switch>
				<Route exact path="/extra" component={Extra} />
				<Route path="/extra/add_tag" component={AddTag} />
				<Route path="/extra/tag/:id" component={EditTag} />
				<Route path="/extra/edit_tag_name" component={AddTag} />
				<Route path="/extra/add_users" component={AddUsers} />
				<Route path="/extra/add_contacts" component={AddUsers} />
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
)(ExtraRouter)
