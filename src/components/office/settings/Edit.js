import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
	clientRightsArray,
	clientRights,
	accessTypesArray,
	accessTypes
} from '../../../constants'
import {
	t_change_rights,
	t_change_access,
	t_delete_role,
	t_delete_role_members
} from '../../../redux/tracks'
import { a_selectRole } from '../../../redux/actions'
import { getUserName } from '../../../utils/helpers'

import Select from '../../common/Select'
import ModalConfirm from '../../common/ModalConfirm'

const { REACT_APP_SERVER } = process.env

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

const sortByTag = (a, b) => {
	if (!a.tags[0] || !b.tags[0]) return 0
	let depA = a.tags[0].name.toLowerCase(),
		depB = b.tags[0].name.toLowerCase()
	if (depA < depB) return -1
	if (depA > depB) return 1
	return 0
}

class Edit extends PureComponent {
	state = {
		openConfirm: false,
		editUsers: false,
		usersOpen: true,
		usersSort: 'name',
		selectedUsers: []
	}

	toggleAccess = payload => {
		const {
			changeAccess,
			history,
			location: {
				state: { item, client }
			}
		} = this.props
		changeAccess(payload)
		history.replace({
			state: { item: { ...item, [payload.field]: payload.value }, client }
		})
	}

	changeRights = payload => {
		const {
			changeRights,
			history,
			location: {
				state: { item, client }
			}
		} = this.props
		changeRights(payload)
		history.replace({
			state: {
				item: { ...item, [payload.field]: payload.value },
				client
			}
		})
	}

	deletePosition = async (_id, type) => {
		const { deleteRole, history } = this.props
		await deleteRole({ _id, type })
		history.push('/settings')
	}

	editToggle = (e, field) => {
		e.preventDefault()
		this.setState(prevState => ({ [field]: !prevState[field] }))
	}

	sortUsers = (e, usersSort) => {
		e.preventDefault()
		const {
			location: {
				state: { item }
			}
		} = this.props
		switch (usersSort) {
			case 'name':
				item.view_contacts_tags.sort(sortByName)
				break
			case 'department':
				item.view_contacts_tags.sort(sortByDepartment)
				break
			case 'tag':
				item.view_contacts_tags.sort(sortByTag)
				break
			default:
				return null
		}
		this.setState({ usersSort })
	}

	componentDidMount() {
		const {
			location: {
				state: { item, client }
			},
			selectRole
		} = this.props
		selectRole({ item, client })
	}

	selectUser = id => {
		let selectedUsers = [...this.state.selectedUsers]
		if (selectedUsers.includes(id)) {
			selectedUsers = selectedUsers.filter(u => u !== id)
		} else {
			selectedUsers.push(id)
		}
		this.setState({ selectedUsers })
	}

	deleteUsers = e => {
		e.preventDefault()
		const { selectedUsers } = this.state
		if (selectedUsers.length > 0) {
			const {
				location: {
					state: { item }
				},
				history: { replace },
				deleteRoleMembers
			} = this.props
			deleteRoleMembers(
				{ _id: item._id, view_contacts_tags: selectedUsers },
				item => {
					replace({ state: { item } })
					this.setState({ selectedUsers: [] })
				}
			)
		} else {
			toast.warn('Пользователи не выбраны')
		}
	}

	render() {
		const {
			location: {
				state: { item, client }
			}
		} = this.props
		const {
			editUsers,
			openConfirm,
			usersSort,
			selectedUsers,
			usersOpen
		} = this.state
		console.log(item);
		const usersCount = item.name.length
		const role = item.type === 'role'
		const name = role ? item.name : item.name
		return (
			<div className="content">
				{openConfirm && (
					<ModalConfirm
						title="Удаление роли"
						message="Вы уверенны что хотите удалить роль?"
						close={() => this.setState({ openConfirm: false })}
						confirm={() =>
							this.deletePosition(
								item._id,
								role ? 'roles' : 'positions'
							)
						}
					/>
				)}
				<div className="container-fluid">
					<div className="settings-manager">
						<div className="settings-manager-header">
							<div className="row align-items-center justify-content-between">
								<div className="col-auto">
									<div className="settings-manager-header__title">
										{name}
									</div>
								</div>
								{role && (
									<div className="col-auto">
										<div className="btns btns--small">
											<Link
												to={{
													pathname:
														'/settings/edit_role',
													state: { edit: true, item }
												}}
												className="edit-btn"
											>
												{' '}
											</Link>
											<a
												onClick={e => {
													e.preventDefault()
													this.setState({
														openConfirm: true
													})
												}}
												href="#!"
												className="delete-btn"
											>
												{' '}
											</a>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="settings-manager-header__divider" />
						<form className="form form-settings form-settings-manager">
							<table className="table table-settings-manager">
								<thead>
									{client ? (
										<tr>
											<th>{role ? 'Роль' : 'Позиция'}</th>
											<th>Создание групп</th>
											<th>
												Доступ к просмотру
												<br /> контактов
											</th>
											<th>Постановка задач</th>
											<th>Написание новостей</th>
										</tr>
									) : (
										<tr>
											<th>{role ? 'Роль' : 'Позиция'}</th>
											<th>
												Доступ{' '}
												<span className="th-small">
													в панель
													<br /> упрвления
												</span>
											</th>
											<th>Пользователи</th>
											<th>Подразделения</th>
											<th>Группы</th>
											<th>Новости</th>
											<th>История</th>
											<th>
												Доступ{' '}
												<span className="th-small">
													к дочерним
													<br /> подраздлениям
												</span>
											</th>
										</tr>
									)}
								</thead>
								<tbody>
									{client ? (
										<tr>
											<td>{name}</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<Select
													options={clientRightsArray}
													className="select select-settings"
													changeHandler={selectedOption =>
														this.changeRights({
															_id: item._id,
															field:
																'create_groups',
															value:
																selectedOption.value,
															type: role
																? 'roles'
																: 'positions'
														})
													}
													value={
														clientRights[
														item.create_groups
														]
													}
													classNamePrefix="my-client-settings"
												/>
											</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<Select
													options={clientRightsArray}
													className="select select-settings"
													changeHandler={selectedOption =>
														this.changeRights({
															_id: item._id,
															field:
																'view_contacts',
															value:
																selectedOption.value,
															type: role
																? 'roles'
																: 'positions'
														})
													}
													value={
														clientRights[
														item.view_contacts
														]
													}
													classNamePrefix="my-client-settings"
												/>
											</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<Select
													options={clientRightsArray}
													className="select select-settings"
													changeHandler={selectedOption =>
														this.changeRights({
															_id: item._id,
															field:
																'tasks_assignment',
															value:
																selectedOption.value,
															type: role
																? 'roles'
																: 'positions'
														})
													}
													value={
														clientRights[
														item
															.tasks_assignment
														]
													}
													classNamePrefix="my-client-settings"
												/>
											</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<Select
													options={clientRightsArray}
													className="select select-settings"
													changeHandler={selectedOption =>
														this.changeRights({
															_id: item._id,
															field:
																'create_news',
															value:
																selectedOption.value,
															type: role
																? 'roles'
																: 'positions'
														})
													}
													value={
														clientRights[
														item.create_news
														]
													}
													classNamePrefix="my-client-settings"
												/>
											</td>
										</tr>
									) : (
										<tr>
											<td>{name}</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<input
													className="settings-check"
													type="checkbox"
													id={`c_${item._id}`}
													checked={item.admin_access}
													onChange={() =>
														this.toggleAccess({
															_id: item._id,
															field:
																'admin_access',
															value: !item.admin_access,
															type: role
																? 'roles'
																: 'positions'
														})
													}
												/>
												<label
													htmlFor={`c_${item._id}`}
												/>
											</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<Select
													options={accessTypesArray}
													className="select select-settings"
													changeHandler={selectedOption =>
														this.changeRights({
															_id: item._id,
															field: 'users',
															value:
																selectedOption.value,
															type: role
																? 'roles'
																: 'positions'
														})
													}
													value={
														accessTypes[item.users]
													}
													classNamePrefix="my-settings"
												/>
											</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<Select
													options={accessTypesArray}
													className="select select-settings"
													changeHandler={selectedOption =>
														this.changeRights({
															_id: item._id,
															field:
																'departments',
															value:
																selectedOption.value,
															type: role
																? 'roles'
																: 'positions'
														})
													}
													value={
														accessTypes[
														item.departments
														]
													}
													classNamePrefix="my-settings"
												/>
											</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<Select
													options={accessTypesArray}
													className="select select-settings"
													changeHandler={selectedOption =>
														this.changeRights({
															_id: item._id,
															field: 'groups',
															value:
																selectedOption.value,
															type: role
																? 'roles'
																: 'positions'
														})
													}
													value={
														accessTypes[item.groups]
													}
													classNamePrefix="my-settings"
												/>
											</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<Select
													options={accessTypesArray}
													className="select select-settings"
													changeHandler={selectedOption =>
														this.changeRights({
															_id: item._id,
															field: 'news',
															value:
																selectedOption.value,
															type: role
																? 'roles'
																: 'positions'
														})
													}
													value={
														accessTypes[item.news]
													}
													classNamePrefix="my-settings"
												/>
											</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<Select
													options={accessTypesArray}
													className="select select-settings"
													changeHandler={selectedOption =>
														this.changeRights({
															_id: item._id,
															field: 'history',
															value:
																selectedOption.value,
															type: role
																? 'roles'
																: 'positions'
														})
													}
													value={
														accessTypes[
														item.history
														]
													}
													classNamePrefix="my-settings"
												/>
											</td>
											<td
												onClick={e =>
													e.stopPropagation()
												}
											>
												<input
													className="settings-check"
													type="checkbox"
													id={`ch_${item._id}`}
													checked={item.asccess_child}
													onChange={() =>
														this.toggleAccess({
															_id: item._id,
															field:
																'asccess_child',
															value: !item.asccess_child,
															type: role
																? 'roles'
																: 'positions'
														})
													}
												/>
												<label
													htmlFor={`ch_${item._id}`}
												/>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</form>
					</div>
					<div
						className={`accordion-container table-edit-js ${usersOpen ? '' : 'hide'
							} ${editUsers ? 'table-edit-js--edit' : ''}`}
					>
						<div className="accordion-header">
							<div
								className="accordion-header__title"
								data-tr-count-1="Пользователей Пользователь Пользователя"
							>
								{usersCount} пользователей
							</div>
							<div
								onClick={() =>
									this.setState(prevState => ({
										usersOpen: !prevState.usersOpen
									}))
								}
								className={`accordion-header__btn ${usersOpen ? '' : 'hide'
									}`}
							>
								<img
									src={REACT_APP_SERVER + '/img/accordion.svg'}
									alt=""
									width={24}
								/>
							</div>
						</div>
						<div className="row justify-content-between align-items-center">
							<div className="col-auto">
								<div className="sort">
									<div className="sort__label">
										Сортировать по
									</div>
									<div className="sort__link">
										<a
											onClick={e =>
												this.sortUsers(e, 'department')
											}
											className={`${usersSort === 'department'
												? 'active'
												: ''
												}`}
											href="#!"
										>
											подразделению
										</a>{' '}
										<a
											onClick={e =>
												this.sortUsers(e, 'tag')
											}
											className={`${usersSort === 'tag'
												? 'active'
												: ''
												}`}
											href="#!"
										>
											тегу
										</a>{' '}
										<a
											onClick={e =>
												this.sortUsers(e, 'name')
											}
											className={`${usersSort === 'name'
												? 'active'
												: ''
												}`}
											href="#!"
										>
											имени
										</a>
									</div>
								</div>
							</div>
							<div className="col-auto">
								<div className="btns btns--small">
									{editUsers && (
										<a
											href="#!"
											className="cancel-btn"
											onClick={e =>
												this.editToggle(e, 'editUsers')
											}
										>
											{' '}
										</a>
									)}
									<a
										href="#!"
										className={`${editUsers ? 'delete' : 'edit'
											}-btn`}
										onClick={
											editUsers
												? e => this.deleteUsers(e)
												: e =>
													this.editToggle(
														e,
														'editUsers'
													)
										}
									>
										{' '}
									</a>
									<Link
										to={{
											pathname: '/settings/add_members',
											state: { item }
										}}
										className="add-btn"
									>
										{' '}
									</Link>
								</div>
							</div>
						</div>
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
								{item.view_contacts_tags.map((u, id) => (
									<tr key={id}>
										<td>
											<div className="table__circle">
												<input
													type="checkbox"
													id={`c${id}`}
													className="table-check"
													checked={selectedUsers.includes(
														u._id
													)}
													onChange={() => {
														this.selectUser(u._id)
													}}
												/>
												<label htmlFor={`c${id}`} />
											</div>
										</td>
										<td>{getUserName(u, true)}</td>
										<td>
											{u.department
												? u.department.name
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
											{u.position ? u.position.name : '-'}
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
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	// settings: state.settings
})
const mapDispatchToProps = dispatch => ({
	changeRights: payload => {
		dispatch(t_change_rights(payload))
	},
	changeAccess: payload => {
		dispatch(t_change_access(payload))
	},
	deleteRole: async payload => {
		await dispatch(t_delete_role(payload))
	},
	selectRole: payload => {
		dispatch(a_selectRole(payload))
	},
	deleteRoleMembers: (payload, onSuccess) => {
		dispatch(t_delete_role_members(payload, onSuccess))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Edit)
