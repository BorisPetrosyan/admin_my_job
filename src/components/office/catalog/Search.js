// import React, { PureComponent } from 'react'
// import { connect } from 'react-redux'
// // import DropdownTreeSelect from 'react-dropdown-tree-select'
// import { withRouter } from 'react-router-dom'

// import { reEscape } from '../../../utils/helpers'

// import Select from '../../common/Select'
// import TreeSelect from '../../common/TreeSelect'

// const { PUBLIC_URL } = process.env

// class Search extends PureComponent {
// 	state = {
// 		openFilter: false,
// 		filtered: false,
// 		searchString: '',
// 		companies_list: [],
// 		checked_companies: []
// 	}

// 	clearFilter = e => {
// 		e.preventDefault()
// 		console.log('clearFilter')
// 		this.setState({ filtered: false, openFilter: false })
// 	}

// 	filter = e => {
// 		e.preventDefault()
// 		console.log('filter')
// 		this.setState({ filtered: true, openFilter: false })
// 	}

// 	search = searchString => {
// 		let {
// 			users,
// 			setFilter,
// 			news: { newsSources, news },
// 			location: { pathname },
// 			sources
// 		} = this.props
// 		let re = new RegExp(reEscape(searchString), 'i')
// 		switch (pathname) {
// 			case '/users':
// 				users = users.filter(
// 					u =>
// 						re.test(u.first_name) ||
// 						re.test(u.last_name) ||
// 						re.test(u.phone_number)
// 				)
// 				setFilter(searchString !== '' ? true : false, users)
// 				break
// 			case '/news':
// 				if (sources) {
// 					newsSources = newsSources.filter(
// 						s => re.test(s.name) || s.name === searchString
// 					)
// 					setFilter(searchString !== '' ? true : false, newsSources)
// 				} else {
// 					news = news.filter(
// 						n => re.test(n.text) || n.text === searchString
// 					)
// 					setFilter(searchString !== '' ? true : false, news)
// 				}
// 				break
// 			default:
// 				return null
// 		}
// 		this.setState({ searchString })
// 	}

// 	getDepartmentList = () => {
// 		const { companies } = this.props
// 		let companies_list = companies.filter(c => c.level === 1)
// 		let notSelected = {
// 			label: 'Не выбрано',
// 			value: -1,
// 			checked: true
// 		}

// 		companies_list = companies_list.map(c => {
// 			return {
// 				label: c.name,
// 				value: c._id,
// 				children: this._recursiveSub(c),
// 				checked: false,
// 				expanded: true
// 			}
// 		})
// 		companies_list.push(notSelected)
// 		this.setState({ companies_list })
// 	}

// 	_recursiveSub = c => {
// 		if (
// 			!c.subdivisions ||
// 			(c.subdivisions && c.subdivisions.length === 0)
// 		) {
// 			return null
// 		}
// 		return c.subdivisions.map(s => {
// 			return {
// 				label: s.name,
// 				value: s._id,
// 				children: this._recursiveSub(s),
// 				checked: false,
// 				expanded: false
// 			}
// 		})
// 	}

// 	componentDidMount() {
// 		const { companies } = this.props
// 		if (companies) {
// 			this.getDepartmentList()
// 		}
// 	}

// 	render() {
// 		// const { users } = this.props
// 		const {
// 			openFilter,
// 			filtered,
// 			searchString,
// 			companies_list,
// 			checked_companies
// 		} = this.state
// 		return (
// 			<div className="search">
// 				<div className="search-container">
// 					<div className="search-icon" />
// 					<input
// 						type="text"
// 						className="search-input"
// 						placeholder="Поиск"
// 						onChange={e => this.search(e.target.value)}
// 						value={searchString}
// 					/>
// 					<div
// 						onClick={() =>
// 							this.setState({
// 								openFilter: true
// 							})
// 						}
// 						className={`search-filter-icon ${
// 							filtered ? 'active' : ''
// 						}`}
// 					>
// 						<img
// 							src={PUBLIC_URL + '/img/search-filter-icon.svg'}
// 							alt="img"
// 							width={20}
// 						/>
// 					</div>
// 					<div
// 						onClick={e => this.clearFilter(e)}
// 						className={`search-filter-remove ${
// 							filtered ? 'active' : ''
// 						}`}
// 					/>
// 				</div>
// 				<div
// 					className="modal-filter"
// 					style={{ display: openFilter ? 'block' : 'none' }}
// 				>
// 					<form className="form" id="form-filter">
// 						<div className="modal-filter__header">
// 							<p>Фильтр</p>
// 							<div
// 								onClick={() =>
// 									this.setState({
// 										openFilter: false
// 									})
// 								}
// 								className="modal-filter__close"
// 							>
// 								<img
// 									src={PUBLIC_URL + '/img/close.svg'}
// 									alt="img"
// 									width={30}
// 								/>
// 							</div>
// 						</div>
// 						<div className="input-group">
// 							<div className="label">Подразделение</div>
// 							<TreeSelect
// 								nodes={companies_list}
// 								checked={checked_companies.map(String)}
// 								onCheck={checked_companies =>
// 									this.setState({
// 										checked_companies
// 									})
// 								}
// 							/>
// 							{/*<DropdownTreeSelect
// 								data={companies_list}
// 								onChange={(current, selected) =>
// 									this.changeDepartment(current)
// 								}
// 								className="select"
// 							/>*/}
// 						</div>
// 						<div className="input-group">
// 							<div className="label">Позиция</div>
// 							<Select />
// 						</div>
// 						<div className="input-group">
// 							<div className="label">Роль</div>
// 							<Select />
// 						</div>
// 						<div className="input-group">
// 							<div className="label">Теги</div>
// 							<Select multiple />
// 						</div>
// 						<div className="btn-confirm">
// 							<a
// 								onClick={e => this.filter(e)}
// 								href="#!"
// 								className="btn-confirm__ok"
// 							>
// 								Отфильтровать
// 							</a>
// 							<a
// 								onClick={e => this.clearFilter(e)}
// 								href="#!"
// 								className="btn-confirm__cancel"
// 							>
// 								Отменить
// 							</a>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		)
// 	}
// }

// const mapStateToProps = state => ({
// 	users: state.users.data,
// 	companies: state.companies.data,
// 	news: state.news
// })
// const mapDispatchToProps = dispatch => ({
// 	// setAllUsers: payload => {
// 	// 	dispatch(a_setAllUsers(payload))
// 	// }
// })

// export default withRouter(
// 	connect(
// 		mapStateToProps,
// 		mapDispatchToProps
// 	)(Search)
// )
