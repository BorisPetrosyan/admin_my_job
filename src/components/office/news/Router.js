import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { t_load_news } from '../../../redux/tracks'

import News from './'
import AddNews from './AddNews'
import NewsEdit from './NewsEdit'
import NewsInfo from './NewsInfo'
import Source from './Source'
import AddSource from './AddSource'
import EditSource from './EditSource'
import AddUsers from '../../common/AddUsers'

class NewsRouter extends PureComponent {
	componentDidMount() {
		this.props.loadNews()
	}

	render() {
		const {
			news: { news, newsSources },
			tags,
			companies
		} = this.props
		return (
			<Switch>
				{news && <Route exact path="/news" component={News} />}
				{newsSources && <Route path="/news/add" component={AddNews} />}
				<Route path="/news/edit_news" component={NewsEdit} />
				<Route path="/news/info" component={NewsInfo} />
				<Route path="/news/source" component={Source} />
				{tags && companies && (
					<Route path="/news/add_source" component={AddSource} />
				)}
				{tags && companies && (
					<Route path="/news/edit_source" component={EditSource} />
				)}
				<Route path="/news/add_authors" component={AddUsers} />
				<Route path="/news/edit_authors" component={AddUsers} />
			</Switch>
		)
	}
}

const mapStateToProps = state => ({
	news: state.news,
	tags: state.extra.tags,
	companies: state.companies.data
})
const mapDispatchToProps = dispatch => ({
	loadNews: () => dispatch(t_load_news())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewsRouter)
