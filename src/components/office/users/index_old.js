import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { t_load_users } from '../../../redux/tracks'
import { getUserName } from '../../../utils/helpers'
import { positionsNames } from '../../../constants'

import Search from './Search'

const { REACT_APP_SERVER } = process.env

// const sortByTag = (a, b) => {
// 	return a.tags[0] - b.tags[0]
// }

const sortByName = (a, b) => {
	let nameA = a.first_name.toLowerCase(),
		nameB = b.first_name.toLowerCase()
	if (nameA < nameB) return -1
	if (nameA > nameB) return 1
	return 0
}

const sortByDepartment = (a, b) => {
	if (!a.department || !b.department) return 0
	let depA = a.department.name.toLowerCase(),
		depB = b.department.name.toLowerCase()
	if (depA < depB) return -1
	if (depA > depB) return 1
	return 0
}

class Users extends Component {
	state = {
		sort: 'name',
		filtered: false,
		filteredUsers: []
	}

	sort = (e, sort) => {
		e.preventDefault()
		let { users } = this.props
		this.setState({ sort })
		switch (sort) {
			case 'name':
				users.sort(sortByName)
				break
			case 'department':
				users.sort(sortByDepartment)
				break
			default:
				return null
		}
	}

	edit = u => {
		const { history } = this.props
		history.push('/users/info/' + u._id, { user: u })
	}

	componentDidMount() {
		this.props.loadUsers()
	}

	render() {
		const { users, companies } = this.props
		const { sort, filtered, filteredUsers } = this.state
		const users_list = filtered ? filteredUsers : users
		return (
			<div className="content">
				<div className="container-fluid">
					<div className="btn-bottom">
						<Link to="/users/add" className="add-btn" />
					</div>
					<div className="row align-items-center justify-content-between">
						<div className="col-6">
							{companies && (
								<Search
									setFilter={(filtered, filteredUsers) =>
										this.setState({
											filtered,
											filteredUsers
										})
									}
								/>
							)}
						</div>
						<div className="col-auto">
							<div className="sort">
								<div className="sort__label">
									Сортировать по
								</div>
								<div className="sort__link">
									<a
										onClick={e =>
											this.sort(e, 'department')
										}
										href="#!"
										className={`${sort === 'department'
											? 'active'
											: ''
											}`}
									>
										подразделению
									</a>{' '}
									<a
										onClick={e => this.sort(e, 'tag')}
										href="#!"
										className={`${sort === 'tag' ? 'active' : ''
											}`}
									>
										тегу
									</a>{' '}
									<a
										onClick={e => this.sort(e, 'name')}
										href="#!"
										className={`${sort === 'name' ? 'active' : ''
											}`}
									>
										имени
									</a>
								</div>
							</div>
						</div>
					</div>
					{users_list.length > 0 ? (
						<table className="table table-link-js">
							<thead>
								<tr>
									<th />
									<th>ФИО</th>
									<th>Компании</th>
									<th>Подразделение</th>
									<th>Должность</th>
									<th>Теги</th>
									<th>Позиция</th>
									<th>Роли</th>
									<th>Контакты</th>
								</tr>
							</thead>
							<tbody>
								{users_list.map(u => (
									<tr
										key={u._id}
										onClick={() => this.edit(u)}
									>
										<td>
											<div className="table__image">
												{u.image && (
													<img
														src={
															REACT_APP_SERVER +
															u.image
														}
														alt="img"
													/>
												)}
											</div>
										</td>
										<td>{getUserName(u)}</td>
										<td>
											{u.companies.length > 0
												? u.companies.map((c, id) => (
													<span
														key={id}
														className="tag"
													>
														{c.name}
													</span>
												))
												: '-'}
										</td>
										<td>
											{u.departments.length > 0
												? u.departments.map((d, id) => (
													<span
														key={id}
														className="tag"
													>
														{d.name}
													</span>
												))
												: '-'}
										</td>
										<td>{u.post || '-'}</td>
										<td>
											{u.tags.length > 0
												? u.tags.map((t, id) => (
													<span
														key={id}
														className="tag"
													>
														{t.name}
													</span>
												))
												: '-'}
										</td>
										<td>
											{u.position
												? u.position.name : '-'}
										</td>
										<td>{u.role ? u.role.name : '-'}</td>
										<td>
											<div>{u.phone_number}</div>
											<div>{u.email}</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="my-not-found">
							{filtered
								? 'Пользователи не найдены'
								: 'Пользователей нет'}
						</div>
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	users: state.users.data,
	companies: state.companies.data
})
const mapDispatchToProps = dispatch => ({
	loadUsers: () => {
		dispatch(t_load_users())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Users)
