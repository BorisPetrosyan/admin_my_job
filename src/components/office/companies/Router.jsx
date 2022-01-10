import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

// import { t_load_companies } from '../../../redux/tracks'

import Companies from './index_new'
import AddCompany from './Add'
import Edit from './Edit'
import AddUsers from '../../common/AddUsers'
import EditCompany from './EditCompany'
import AddSubdivisions from './AddSubdivisions'

class Office extends PureComponent {
	// componentDidMount() {
	// 	this.props.loadCompanies()
	// }

	render() {
		const { companies } = this.props
		return (
			<Switch>
				<Route exact path="/companies" component={Companies} />
				{companies && (
					<Route path="/companies/add" component={AddCompany} />
				)}

				<Route path="/companies/edit/:id" render={(props) => <Edit {...props} />} />
				<Route path="/companies/add_users" component={AddUsers} />
				{companies && (
					<Route path="/companies/edit_company/:id" component={EditCompany} />
				)}
				{companies && (
					<Route path="/companies/add_subdivisions/:id" component={AddSubdivisions} />
				)}
			</Switch>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.companies.data
	// dialogs: state.dialogs,
	// profile: state.profile
})
const mapDispatchToProps = dispatch => ({
	// loadCompanies: () => {
	// 	dispatch(t_load_companies())
	// }
})

export default connect(mapStateToProps, mapDispatchToProps)(Office)
