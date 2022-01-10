import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'

import { getUserName } from '../../utils/helpers'
import {
	t_add_company_users,
	t_add_tag_users,
	t_add_group_participants,
	t_add_role_members,
	t_add_tag_contacts
} from '../../redux/tracks'
import { a_setSourceUsers } from '../../redux/actions'

import Search from '../office/users/Search'

// const { PUBLIC_URL } = process.env

class AddUsers extends PureComponent {
	state = {
		users: [],
		filtered: false,
		filteredUsers: []
	}

	changeUsers = id => {
		let users = [...this.state.users]
		if (users.includes(id)) {
			users = users.filter(u => u !== id)
		} else {
			users.push(id)
		}
		this.setState({ users })
	}

	saveUsers = e => {
		e.preventDefault()
		const {
			location: {
				state: {
					company: { _id }
				}
			},
			history: { push },
			addCompanyUsers
		} = this.props
		const { users } = this.state
		addCompanyUsers({
			payload: { company_id: _id, users },
			success: company => {
				push(`/companies/edit/${_id}`, { company })
			}
		})
	}

	createGroup = e => {
		e.preventDefault()
		console.log('createGroup')
		// const {
		// 	location: {
		// 		state: {
		// 			company: { _id }
		// 		}
		// 	},
		// 	history: { push },
		// 	addCompanyUsers
		// } = this.props
		// const { users } = this.state
		// addCompanyUsers({
		// 	payload: { company_id: _id, users },
		// 	success: company => {
		// 		push('/companies/edit', { company })
		// 	}
		// })
	}

	// async componentDidMount() {
	// 	const {
	// 		location: {
	// 			state: { tag }
	// 		},
	// 		history: { push },
	// 		addTagUsers
	// 	} = this.props
	// 	const { users } = this.state
	// 	console.log('updatedTag', 1)
	// 	const updatedTag = await addTagUsers({ tag_id: tag._id, users })
	// 	console.log('updatedTag', 2, updatedTag)
	// }

	addTagUsers = () => {
		const {
			location: {
				state: { tag }
			},
			history: { push },
			addTagUsers
		} = this.props
		const { users } = this.state
		addTagUsers({ tag_id: tag._id, users }, updatedTag => {
			push('/extra/tag/' + tag._id, { tag: updatedTag })
		})
	}

	addTagContacts = () => {
		const {
			location: {
				state: { tag }
			},
			history: { push },
			addTagContacts
		} = this.props
		const { users } = this.state
		addTagContacts({ tag_id: tag._id, contacts: users }, updatedTag => {
			push('/extra/tag/' + tag._id, { tag: updatedTag })
		})
	}

	addSourceUsers = () => {
		const {
			history: { push },
			setSourceUsers,
			users: { data }
		} = this.props
		const { users } = this.state
		let sourceUsers = []
		data.forEach(u => {
			if (users.includes(u._id)) {
				sourceUsers.push(u)
			}
		})
		setSourceUsers(sourceUsers)
		push('/news/add_source')
	}

	editSourceUsers = () => {
		const {
			history: { push },
			setSourceUsers,
			users: { data },
			selectedSource,
			sourceUsers
		} = this.props
		const { users } = this.state
		// let sourceUsers = []
		data.forEach(u => {
			if (users.includes(u._id)) {
				sourceUsers.push(u)
			}
		})
		setSourceUsers(sourceUsers)
		push('/news/edit_source', {
			source: { ...selectedSource, authors: sourceUsers }
		})
	}

	addParticipants = () => {
		const {
			history: { push },
			addGroupParticipants,
			selectedGroup
		} = this.props
		const { users } = this.state
		addGroupParticipants({ users, group_id: selectedGroup._id }, group => {
			push('/control/group_info', { group })
		})
	}

	addMembers = () => {
		const {
			history: { push },
			addRoleMembers,
			selectedRole
		} = this.props
		const { users } = this.state
		addRoleMembers({ members: users, _id: selectedRole.item._id }, item => {
			push('/settings/edit', { item })
		})
	}

	getDataByPathname = () => {
		const {
			location: { pathname },
			users: { data },
			selectedCompany,
			selectedTag,
			sourceUsers,
			selectedGroup,
			selectedRole
		} = this.props
		switch (pathname) {
			case '/control/create_group':
				return {
					filteredUsers: data,
					confirm: this.createGroup
				}
			case '/companies/add_users':
				return {
					filteredUsers: data.filter(
						u =>
							!u.company ||
							(u.company && u.company._id !== selectedCompany._id)
					),
					confirm: this.saveUsers
				}
			case '/extra/add_users':
				if (selectedTag) {
					return {
						filteredUsers: data.filter(
							u =>
								u.tags.length === 0 ||
								u.tags.every(t => t._id !== selectedTag._id)
						),
						confirm: this.addTagUsers
					}
				}
				break
			case '/extra/add_contacts':
				if (selectedTag) {
					const contactsIds = selectedTag.contacts.map(c => c._id)
					return {
						filteredUsers: data.filter(
							u => !contactsIds.includes(u._id)
						),
						confirm: this.addTagContacts
					}
				}
				break
			case '/news/add_authors':
				const sourceUsersIds = sourceUsers.map(u => u._id)
				return {
					filteredUsers: data.filter(
						u => !sourceUsersIds.includes(u._id)
					),
					confirm: this.addSourceUsers
				}
			case '/news/edit_authors':
				const sourceUsersIds2 = sourceUsers.map(u => u._id)
				return {
					filteredUsers: data.filter(
						u => !sourceUsersIds2.includes(u._id)
					),
					confirm: this.editSourceUsers
				}
			case '/control/add_group_users':
				const participantsIds = selectedGroup.participants.map(
					u => u._id
				)
				return {
					filteredUsers: data.filter(
						u =>
							!participantsIds.includes(u._id) &&
							u._id !== selectedGroup.creator._id
					),
					confirm: this.addParticipants
				}
			case '/settings/add_members':
				const membersIds = selectedRole.item.members.map(u => u._id)
				return {
					filteredUsers: data.filter(
						u => !membersIds.includes(u._id)
					),
					confirm: this.addMembers
				}
			default:
				break
		}
	}

	sort = e => {
		e.preventDefault()
	}

	render() {
		const {
			history: { goBack },
			// users: { data },
			// selectedCompany,
			companies
		} = this.props
		const { users } = this.state
		// const filteredUsers = []
		// const filteredUsers = data.filter(
		// 	u =>
		// 		!u.company ||
		// 		(u.company && u.company._id !== selectedCompany._id)
		// )
		const notEmpty = this.getDataByPathname()
		if (notEmpty) {
			var { filteredUsers, confirm } = notEmpty
		} else {
			goBack()
		}
		if (notEmpty) {
			return (
				<Fragment>
					<div className="content">
						<div className="container-fluid">
							<div className="table-edit-js table-edit-js--edit">
								<div className="row justify-content-between align-items-center">
									<div className="col-6">
										{companies && (
											<Search
												setFilter={(
													filtered,
													filteredUsers
												) =>
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
													onClick={e => this.sort(e)}
													href="#!"
												>
													подразделению
												</a>{' '}
												<a
													onClick={e => this.sort(e)}
													href="#!"
												>
													тегу
												</a>{' '}
												<a
													onClick={e => this.sort(e)}
													href="#!"
													className="active"
												>
													имени
												</a>
											</div>
										</div>
									</div>
								</div>
								{filteredUsers.length > 0 ? (
									<table className="table table-choose-js">
										<thead>
											<tr>
												<th />
												<th>ФИО</th>
												<th>Подразделение</th>
												<th>Должность</th>
												<th>Теги</th>
												<th>Позиция</th>
												<th>Роли</th>
												<th>Контакты</th>
											</tr>
										</thead>
										<tbody>
											{filteredUsers.map((u, id) => (
												<tr key={id}>
													<td>
														<div className="table__circle">
															<input
																type="checkbox"
																id={`c${id}`}
																checked={users.includes(
																	u._id
																)}
																className="table-check"
																onChange={() =>
																	this.changeUsers(
																		u._id
																	)
																}
															/>
															<label
																htmlFor={`c${id}`}
															/>
														</div>
													</td>
													<td>{getUserName(u)}</td>
													<td>
														{u.department
															? u.department.name
															: '-'}
													</td>
													<td>{u.post || '-'}</td>
													<td>
														{u.tags.length > 0
															? u.tags.map(
																	(t, id) => (
																		<span
																			key={
																				id
																			}
																			className="tag"
																		>
																			{
																				t.name
																			}
																		</span>
																	)
															  )
															: '-'}
													</td>
													<td>
														{u.position
															? u.position.name
															: '-'}
													</td>
													<td>
														{u.role
															? u.role.name
															: '-'}
													</td>
													<td>
														<div>
															{u.phone_number}
														</div>
														<div>{u.email}</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<div>Нет свободных пользователей</div>
								)}
							</div>
						</div>
					</div>

					<div className="btn-confirm">
						<a
							href="#!"
							onClick={() => goBack()}
							className="btn-confirm__cancel"
						>
							Отменить
						</a>
						{filteredUsers.length > 0 && (
							<a
								href="#!"
								className="btn-confirm__ok"
								onClick={e => {
									e.preventDefault()
									confirm(e)
								}}
							>
								Добавить пользователей
							</a>
						)}
					</div>
				</Fragment>
			)
		} else {
			return null
		}
	}
}
const mapStateToProps = state => ({
	users: state.users,
	selectedCompany: state.companies.selectedCompany,
	companies: state.companies.data,
	selectedTag: state.extra.selectedTag,
	sourceUsers: state.news.sourceUsers,
	selectedSource: state.news.selectedSource,
	selectedGroup: state.control.selectedGroup,
	selectedRole: state.settings.selectedRole
})

const mapDispatchToProps = dispatch => ({
	addCompanyUsers: payload => {
		dispatch(t_add_company_users(payload))
	},
	addTagUsers: (payload, onSuccess) => {
		dispatch(t_add_tag_users(payload, onSuccess))
	},
	addTagContacts: (payload, onSuccess) => {
		dispatch(t_add_tag_contacts(payload, onSuccess))
	},
	setSourceUsers: payload => {
		dispatch(a_setSourceUsers(payload))
	},
	addGroupParticipants: (payload, onSuccess) => {
		dispatch(t_add_group_participants(payload, onSuccess))
	},
	addRoleMembers: (payload, onSuccess) => {
		dispatch(t_add_role_members(payload, onSuccess))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddUsers)
