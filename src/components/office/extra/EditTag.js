import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
	t_delete_tag,
	t_delete_tag_users,
	t_delete_tag_sources,
	t_delete_tag_contacts
} from '../../../redux/tracks'
import { a_selectTag } from '../../../redux/actions'
import { getUserName } from '../../../utils/helpers'

import ModalConfirm from '../../common/ModalConfirm'

const { PUBLIC_URL } = process.env

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

const sortByComments = (a, b) => {
	// let l1 = a.comments.length,
	// 	l2 = b.comments.length
	// if (l1 < l2) return 1
	// if (l1 > l2) return -1
	return 0
}
const sortByLikes = (a, b) => {
	// let l1 = a.likes.length,
	// 	l2 = b.likes.length
	// if (l1 < l2) return 1
	// if (l1 > l2) return -1
	return 0
}
const sortByViews = (a, b) => {
	// let l1 = a.likes.length,
	// 	l2 = b.likes.length
	// if (l1 < l2) return 1
	// if (l1 > l2) return -1
	return 0
}
const sortByDate = (a, b) => {
	let dateA = new Date(a.updated_at),
		dateB = new Date(b.updated_at)
	return dateA - dateB
}

class EditTag extends PureComponent {
	state = {
		tag: {
			name: '',
			description: '',
			news: [],
			users: [],
			sources: [],
			contacts: []
		},
		editUsers: false,
		newsOpen: true,
		usersOpen: true,
		editSources: false,
		contactsOpen: true,
		editContacts: false,
		newsSort: 'date',
		usersSort: 'name',
		selected_users: [],
		selected_sources: [],
		selected_contacts: [],
		sourcesSort: 'date'
	}

	componentDidMount() {
		const {
			location: { pathname, state },
			selectTag
		} = this.props
		if (pathname !== '/extra/add_tag') {
			if (state) {
				selectTag(state.tag)
				this.setState({ tag: state.tag })
			} else {
				selectTag(null)
			}
		}
		window.scrollTo(0, 0)
	}

	deleteTag = async e => {
		const {
			deleteTag,
			location: {
				state: { tag }
			},
			history
		} = this.props
		await deleteTag({ tag_id: tag._id })
		history.goBack()
	}

	editToggle = (e, field) => {
		e.preventDefault()
		this.setState(prevState => ({ [field]: !prevState[field] }))
	}

	deleteUsers = e => {
		e.preventDefault()
		const { selected_users } = this.state
		if (selected_users.length > 0) {
			const {
				location: {
					state: { tag }
				},
				history: { replace },
				deleteTagUsers
			} = this.props
			deleteTagUsers({
				payload: { tag_id: tag._id, users: selected_users },
				onSuccess: tag => {
					replace({ state: { tag } })
					this.setState({ tag, selected_users: [] })
				}
			})
		} else {
			toast.warn('Пользователи не выбраны')
		}
	}

	deleteContacts = e => {
		e.preventDefault()
		const { selected_contacts } = this.state
		if (selected_contacts.length > 0) {
			const {
				location: {
					state: { tag }
				},
				history: { replace },
				deleteTagContacts
			} = this.props
			deleteTagContacts({
				payload: { tag_id: tag._id, contacts: selected_contacts },
				onSuccess: tag => {
					replace({ state: { tag } })
					this.setState({ tag, selected_contacts: [] })
				}
			})
		} else {
			toast.warn('Контакты не выбраны')
		}
	}

	deleteSources = e => {
		e.preventDefault()
		const { selected_sources } = this.state
		if (selected_sources.length > 0) {
			const {
				location: {
					state: { tag }
				},
				history: { replace },
				deleteTagSources
			} = this.props
			deleteTagSources({
				payload: { tag_id: tag._id, sources: selected_sources },
				onSuccess: tag => {
					replace({ state: { tag } })
					this.setState({ tag, selected_sources: [] })
				}
			})
		} else {
			toast.warn('Пользователи не выбраны')
		}
	}

	// selectUser = id => {
	// 	let selected_users = [...this.state.selected_users]
	// 	if (selected_users.includes(id)) {
	// 		selected_users = selected_users.filter(u => u !== id)
	// 	} else {
	// 		selected_users.push(id)
	// 	}
	// 	this.setState({ selected_users })
	// }

	selectValue = (field, id) => {
		let selected = [...this.state[field]]
		if (selected.includes(id)) {
			selected = selected.filter(v => v !== id)
		} else {
			selected.push(id)
		}
		this.setState({ [field]: selected })
	}

	sortUsers = (e, usersSort) => {
		e.preventDefault()
		let { tag } = this.state
		switch (usersSort) {
			case 'name':
				tag.users.sort(sortByName)
				break
			case 'department':
				tag.users.sort(sortByDepartment)
				break
			case 'tag':
				tag.users.sort(sortByTag)
				break
			default:
				return null
		}
		this.setState({ usersSort, tag })
	}

	sortSources = (e, sourcesSort) => {
		e.preventDefault()
		let { tag } = this.state
		switch (sourcesSort) {
			case 'comments':
				tag.sources.sort(sortByComments)
				break
			case 'likes':
				tag.sources.sort(sortByLikes)
				break
			case 'views':
				tag.sources.sort(sortByViews)
				break
			case 'date':
				tag.sources.sort(sortByDate)
				break
			default:
				return null
		}
		this.setState({ sourcesSort, tag })
	}

	render() {
		const {
			tag,
			openConfirm,
			editUsers,
			newsOpen,
			editSources,
			usersOpen,
			selected_users,
			selected_sources,
			usersSort,
			sourcesSort,
			contactsOpen,
			editContacts,
			selected_contacts
		} = this.state
		const users_count = tag.users.length
		const sources_count = tag.sources.length
		const contacts_count = tag.contacts.length
		return (
			<div className="content">
				{openConfirm && (
					<ModalConfirm
						title="Удаление тега"
						message="Вы уверенны что хотите удалить этот тег?"
						close={() => this.setState({ openConfirm: false })}
						confirm={() => this.deleteTag()}
					/>
				)}
				<div className="container-fluid">
					<div className="subvision-header">
						<div className="row justify-content-between align-items-center">
							<div className="col">
								<div className="subvision-header__title">
									{tag.name}
								</div>
								<div className="subvision-header__desc">
									{tag.description}
								</div>
							</div>
							<div className="col-auto">
								<div className="btns btns--small">
									<Link
										to={{
											pathname: '/extra/edit_tag_name',
											state: { tag }
										}}
										className="edit-btn"
									>
										{' '}
									</Link>
									<a
										onClick={e => {
											e.preventDefault()
											this.setState({ openConfirm: true })
										}}
										className="delete-btn"
										href="#!"
									>
										{' '}
									</a>
								</div>
							</div>
						</div>
					</div>
					<div
						className={`accordion-container table-edit-js ${
							newsOpen ? '' : 'hide'
						} ${editSources ? 'table-edit-js--edit' : ''}`}
					>
						<div className="accordion-header">
							<div className="accordion-header__title">
								{sources_count} источников новостей
							</div>
							<div
								onClick={() =>
									this.setState(prevState => ({
										newsOpen: !prevState.newsOpen
									}))
								}
								className={`accordion-header__btn ${
									newsOpen ? '' : 'hide'
								}`}
							>
								<img
									src={PUBLIC_URL + '/img/accordion.svg'}
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
												this.sortSources(e, 'comments')
											}
											className={`${
												sourcesSort === 'comments'
													? 'active'
													: ''
											}`}
											href="#!"
										>
											комментариям
										</a>{' '}
										<a
											onClick={e =>
												this.sortSources(e, 'likes')
											}
											className={`${
												sourcesSort === 'likes'
													? 'active'
													: ''
											}`}
											href="#!"
										>
											лайкам
										</a>{' '}
										<a
											onClick={e =>
												this.sortSources(e, 'views')
											}
											className={`${
												sourcesSort === 'views'
													? 'active'
													: ''
											}`}
											href="#!"
										>
											просмотрам
										</a>{' '}
										<a
											onClick={e =>
												this.sortSources(e, 'date')
											}
											className={`${
												sourcesSort === 'date'
													? 'active'
													: ''
											}`}
											href="#!"
										>
											дате
										</a>
									</div>
								</div>
							</div>
							<div className="col-auto">
								<div className="btns btns--small">
									{editSources && (
										<a
											href="#!"
											className="cancel-btn"
											onClick={e =>
												this.editToggle(
													e,
													'editSources'
												)
											}
										>
											{' '}
										</a>
									)}
									<a
										href="#!"
										className={`${
											editSources ? 'delete' : 'edit'
										}-btn`}
										onClick={
											editSources
												? e => this.deleteSources(e)
												: e =>
														this.editToggle(
															e,
															'editSources'
														)
										}
									>
										{' '}
									</a>
									<Link
										to={{
											pathname: '/extra/add_users',
											state: { tag }
										}}
										className="add-btn"
									>
										{' '}
									</Link>
								</div>
							</div>
						</div>
						{sources_count > 0 ? (
							<table className="table table-link-js table-choose-js">
								<thead>
									<tr>
										<th />
										<th>Название</th>
										<th>Новостей</th>
										<th>Пользователей</th>
										<th>Теги</th>
										<th>Подразделение</th>
									</tr>
								</thead>
								<tbody>
									{tag.sources.map((s, id) => (
										<tr key={id}>
											<td>
												<div className="table__circle">
													<input
														type="checkbox"
														id={`s_${id}`}
														checked={selected_sources.includes(
															s._id
														)}
														className="table-check"
														onChange={() =>
															this.selectValue(
																'selected_sources',
																s._id
															)
														}
													/>
													<label
														htmlFor={`s_${id}`}
													/>
												</div>
											</td>
											<td>{s.name}</td>
											<td>{s.news.length}</td>
											<td>{s.users.length}</td>
											<td>
												{s.tags.length > 0
													? s.tags.map((t, id) => (
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
												{s.departments[0]
													? s.departments[0].name
													: '-'}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div>Источников новостей нет</div>
						)}
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
								{users_count} пользователей
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
											className={`${
												usersSort === 'department'
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
											className={`${
												usersSort === 'tag'
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
											className={`${
												usersSort === 'name'
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
											pathname: '/extra/add_users',
											state: { tag }
										}}
										className="add-btn"
									>
										{' '}
									</Link>
								</div>
							</div>
						</div>
						{users_count > 0 ? (
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
									{tag.users.map((u, id) => (
										<tr key={id}>
											<td>
												<div className="table__circle">
													<input
														type="checkbox"
														id={`u_${id}`}
														className="table-check"
														checked={selected_users.includes(
															u._id
														)}
														onChange={() => {
															this.selectValue(
																'selected_users',
																u._id
															)
														}}
													/>
													<label
														htmlFor={`u_${id}`}
													/>
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
												{u.position
													? u.position.name
													: '-'}
											</td>
											<td>
												{u.role ? u.role.name : '-'}
											</td>
											<td>
												<div>{u.phone_number}</div>
												<div>{u.email}</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div>Нет пользователей с данным тегом</div>
						)}
					</div>

					<div
						className={`accordion-container table-edit-js ${
							contactsOpen ? '' : 'hide'
						} ${editContacts ? 'table-edit-js--edit' : ''}`}
					>
						<div className="accordion-header">
							<div
								className="accordion-header__title"
								data-tr-count-1="Пользователей Пользователь Пользователя"
							>
								{contacts_count} выбранных контактов
							</div>
							<div
								onClick={() =>
									this.setState(prevState => ({
										contactsOpen: !prevState.contactsOpen
									}))
								}
								className={`accordion-header__btn ${
									contactsOpen ? '' : 'hide'
								}`}
							>
								<img
									src={PUBLIC_URL + '/img/accordion.svg'}
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
											className={`${
												usersSort === 'department'
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
											className={`${
												usersSort === 'tag'
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
											className={`${
												usersSort === 'name'
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
									{editContacts && (
										<a
											href="#!"
											className="cancel-btn"
											onClick={e =>
												this.editToggle(
													e,
													'editContacts'
												)
											}
										>
											{' '}
										</a>
									)}
									<a
										href="#!"
										className={`${
											editContacts ? 'delete' : 'edit'
										}-btn`}
										onClick={
											editContacts
												? e => this.deleteContacts(e)
												: e =>
														this.editToggle(
															e,
															'editContacts'
														)
										}
									>
										{' '}
									</a>
									<Link
										to={{
											pathname: '/extra/add_contacts',
											state: { tag }
										}}
										className="add-btn"
									>
										{' '}
									</Link>
								</div>
							</div>
						</div>
						{contacts_count > 0 ? (
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
									{tag.contacts.map((u, id) => (
										<tr key={id}>
											<td>
												<div className="table__circle">
													<input
														type="checkbox"
														id={`c_${id}`}
														className="table-check"
														checked={selected_contacts.includes(
															u._id
														)}
														onChange={() => {
															this.selectValue(
																'selected_contacts',
																u._id
															)
														}}
													/>
													<label
														htmlFor={`c_${id}`}
													/>
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
												{u.position
													? u.position.name
													: '-'}
											</td>
											<td>
												{u.role ? u.role.name : '-'}
											</td>
											<td>
												<div>{u.phone_number}</div>
												<div>{u.email}</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div>Нет выбранных контактов для данного тега</div>
						)}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
	deleteTag: async payload => {
		await dispatch(t_delete_tag(payload))
	},
	selectTag: payload => {
		dispatch(a_selectTag(payload))
	},
	deleteTagUsers: payload => {
		dispatch(t_delete_tag_users(payload))
	},
	deleteTagContacts: payload => {
		dispatch(t_delete_tag_contacts(payload))
	},
	deleteTagSources: payload => {
		dispatch(t_delete_tag_sources(payload))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTag)
