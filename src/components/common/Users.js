import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { t_delete_tag, t_delete_tag_users } from '../../../redux/tracks'
import { a_selectTag } from '../../../redux/actions'
import { getUserName } from '../../../utils/helpers'

import ModalConfirm from '../../common/ModalConfirm'

const { PUBLIC_URL } = process.env

class Users extends PureComponent {
	state = {
		tag: {
			name: '',
			description: '',
			news: [],
			users: []
		},
		editUsers: false,
		newsOpen: true,
		usersOpen: true,
		editNews: false,
		newsSort: 'date',
		usersSort: 'name',
		selected_users: []
	}

	// componentDidMount() {
	// 	const {
	// 		location: { pathname, state },
	// 		selectTag
	// 	} = this.props
	// 	if (pathname !== '/extra/add_tag') {
	// 		if (state) {
	// 			selectTag(state.tag)
	// 			this.setState({ tag: state.tag })
	// 		} else {
	// 			selectTag(null)
	// 		}
	// 	}
	// 	window.scrollTo(0, 0)
	// }

	editUsers = e => {
		e.preventDefault()
		this.setState(prevState => ({ editUsers: !prevState.editUsers }))
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

	selectUser = id => {
		let selected_users = [...this.state.selected_users]
		if (selected_users.includes(id)) {
			selected_users = selected_users.filter(u => u !== id)
		} else {
			selected_users.push(id)
		}
		this.setState({ selected_users })
	}

	render() {
		const { editUsers, usersOpen, selected_users } = this.state
		const { users } = this.props
		const users_count = users.length
		return (
			<div
				className={`accordion-container table-edit-js ${usersOpen ? '' : 'hide'
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
						className={`accordion-header__btn ${usersOpen ? '' : 'hide'
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
							<div className="sort__label">Сортировать по</div>
							<div className="sort__link">
								<a
									onClick={e => this.sort(e, 'department')}
									href="#!"
								>
									подразделению
								</a>{' '}
								<a onClick={e => this.sort(e, 'tag')} href="#!">
									тегу
								</a>{' '}
								<a
									onClick={e => this.sort(e, 'name')}
									href="#!"
									className="active"
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
									onClick={e => this.editUsers(e)}
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
										: e => this.editUsers(e)
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
							{users.map((u, id) => (
								<tr key={id}>
									<td>
										<div className="table__circle">
											<input
												type="checkbox"
												id={`c${id}`}
												className="table-check"
												checked={selected_users.includes(
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
										{u.department ? u.department.name : '-'}
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
				) : (
					<div>Нет пользователей</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Users)
