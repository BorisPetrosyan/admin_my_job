import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
	t_delete_group,
	t_set_group_management,
	t_delete_group_participants
} from '../../../redux/tracks'
import { a_setSelectedGroup } from '../../../redux/actions'
import { getUserName } from '../../../utils/helpers'

import ModalConfirm from '../../common/ModalConfirm'

const { REACT_APP_SERVER, PUBLIC_URL } = process.env

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

class Group extends PureComponent {
	state = {
		openConfirm: false,
		usersOpen: true,
		editUsers: false,
		selectedUsers: [],
		usersSort: 'name',
		management: [null, null]
	}

	componentDidMount() {
		const {
			location: {
				state: { group }
			},
			selectGroup
		} = this.props
		let management = []
		if (group.head) {
			management[0] = group.head._id
		}
		if (group.admin) {
			management[1] = group.admin._id
		}
		this.setState({ management })
		selectGroup(group)
	}

	sortUsers = (e, usersSort) => {
		e.preventDefault()
		let {
			location: {
				state: { group }
			}
		} = this.props
		this.setState({ usersSort })
		switch (usersSort) {
			case 'name':
				group.participants.sort(sortByName)
				break
			case 'department':
				group.participants.sort(sortByDepartment)
				break
			default:
				return null
		}
	}

	selectUser = id => {
		let selectedUsers = [...this.state.selectedUsers]
		if (selectedUsers.includes(id)) {
			selectedUsers = selectedUsers.filter(u => u !== id)
		} else {
			const { management } = this.state
			if (management[0] !== id) {
				selectedUsers.push(id)
			} else {
				toast.info('Нельзя удалить руководителя')
			}
		}
		this.setState({ selectedUsers })
	}

	deleteGroup = async e => {
		const {
			deleteGroup,
			location: {
				state: { group }
			},
			history
		} = this.props
		await deleteGroup({ group_id: group._id })
		history.push('/control')
	}

	editToggle = (e, field) => {
		e.preventDefault()
		this.setState(prevState => ({ [field]: !prevState[field] }))
	}

	deleteUsers = e => {
		e.preventDefault()
		const { selectedUsers } = this.state
		if (selectedUsers.length > 0) {
			const {
				location: {
					state: { group }
				},
				history: { replace },
				deleteGroupParticipants,
				selectGroup
			} = this.props
			deleteGroupParticipants(
				{ group_id: group._id, users: selectedUsers },
				group => {
					replace({ state: { group } })
					selectGroup(group)
					this.setState({ selectedUsers: [] })
				}
			)
		} else {
			toast.warn('Пользователи не выбраны')
		}
	}

	changeHead = (id, pos) => {
		let management = [...this.state.management]
		const {
			setGroupManagement,
			location: {
				state: { group }
			}
		} = this.props
		const ind = management.indexOf(id)
		if (ind !== -1) {
			management[ind] = null
		}
		management[pos] = id
		this.setState({
			management
		})
		setGroupManagement({
			group_id: group._id,
			admin: management[1],
			head: management[0]
		})
	}

	render() {
		const {
			openConfirm,
			selectedUsers,
			editUsers,
			usersSort,
			usersOpen,
			management
		} = this.state
		const {
			location: {
				state: { group }
			}
		} = this.props
		return (
			<div className="content">
				{openConfirm && (
					<ModalConfirm
						title="Удаление группы"
						message="Вы уверенны что хотите удалить группу? Все данные и история переписок будут удалены"
						close={() => this.setState({ openConfirm: false })}
						confirm={() => this.deleteGroup(group._id)}
					/>
				)}
				<div className="container-fluid">
					<div className="control-group-container">
						<div className="source-header justify-content-between">
							<div className="naming-block">
								<div className="naming-block__img">
									{group.image && (
										<img
											src={REACT_APP_SERVER + group.image}
											alt="img"
										/>
									)}
								</div>
								<p>
									{group.name}
									{group.cannot_be_deleted && (
										<span>Неудаляемая группа</span>
									)}
								</p>
							</div>
							<div className="btns btns--small">
								<Link
									to={{
										pathname: '/control/edit_group',
										state: { group }
									}}
									className="edit-btn"
								>
									{' '}
								</Link>
								{!group.cannot_be_deleted && (
									<a
										onClick={e => {
											e.preventDefault()
											this.setState({ openConfirm: true })
										}}
										href="#!"
										className="delete-btn"
									>
										{' '}
									</a>
								)}
							</div>
						</div>
					</div>
					<div
						className={`accordion-container table-edit-js ${
							usersOpen ? '' : 'hide'
						} ${editUsers ? 'table-edit-js--edit' : ''}`}
					>
						<div className="accordion-header">
							<div
								className="accordion-header__title"
								data-tr-count-1="Пользователей Пользователь Пользователя"
							>
								{group.participants.length + 1} пользователей
							</div>
							<div
								onClick={() =>
									this.setState(prevState => ({
										usersOpen: !prevState.usersOpen
									}))
								}
								className={`accordion-header__btn ${
									usersOpen ? '' : 'hide'
								}`}
							>
								<img
									src={PUBLIC_URL + '/img/accordion.svg'}
									alt="img"
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
											className={`${
												usersSort === 'department'
													? 'active'
													: ''
											}`}
											onClick={e =>
												this.sortUsers(e, 'department')
											}
											href="#!"
										>
											подразделению
										</a>{' '}
										<a
											className={`${
												usersSort === 'tag'
													? 'active'
													: ''
											}`}
											onClick={e =>
												this.sortUsers(e, 'tag')
											}
											href="#!"
										>
											тегу
										</a>{' '}
										<a
											className={`${
												usersSort === 'name'
													? 'active'
													: ''
											}`}
											onClick={e =>
												this.sortUsers(e, 'name')
											}
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
										className={`${
											editUsers ? 'delete' : 'edit'
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
											pathname:
												'/control/add_group_users',
											state: { group }
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
									<th>Позиция</th>
									<th>Контакты</th>
									<th>Руководитель</th>
									<th>Администратор</th>
								</tr>
							</thead>
							<tbody>
								{[...group.participants, group.creator].map(
									(u, id) => (
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
														onChange={() =>
															this.selectUser(
																u._id
															)
														}
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
												{u.position
													? u.position.name
													: '-'}
											</td>
											<td>
												<div>{u.phone_number}</div>
												<div>{u.email}</div>
											</td>
											<td>
												<div className="table-radio">
													<input
														type="radio"
														id={`r${id}-1`}
														className="input-radio"
														checked={
															management[0] ===
															u._id
														}
														onChange={() =>
															this.changeHead(
																u._id,
																0
															)
														}
													/>
													<label
														htmlFor={`r${id}-1`}
													/>
												</div>
											</td>
											<td>
												<div className="table-radio">
													<input
														type="radio"
														id={`r${id}-2`}
														className="input-radio"
														checked={
															management[1] ===
															u._id
														}
														onChange={() =>
															this.changeHead(
																u._id,
																1
															)
														}
													/>
													<label
														htmlFor={`r${id}-2`}
													/>
												</div>
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	companies: state.companies,
	newGroup: state.control.newGroup
})
const mapDispatchToProps = dispatch => ({
	deleteGroup: async payload => {
		await dispatch(t_delete_group(payload))
	},
	selectGroup: payload => {
		dispatch(a_setSelectedGroup(payload))
	},
	setGroupManagement: payload => {
		dispatch(t_set_group_management(payload))
	},
	deleteGroupParticipants: (payload, onSuccess) => {
		dispatch(t_delete_group_participants(payload, onSuccess))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Group)
