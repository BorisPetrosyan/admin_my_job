import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { t_load_user_info, t_load_profile } from '../../../redux/tracks'
import { a_setAuth } from '../../../redux/actions'

const { REACT_APP_SERVER } = process.env

class Profile extends PureComponent {
	state = {
		info: null
	}

	componentDidMount() {
		const { profile, loadUserInfo, loadProfile } = this.props
		window.scrollTo(0, 0)
		loadUserInfo({
			_id: profile._id,
			success: info => {
				this.setState({ info })
			}
		})
		loadProfile()
	}

	logout = () => {
		const { setAuth, history } = this.props
		localStorage.removeItem('auth')
		setAuth(null)
		history.push('/')
	}

	render() {
		const { profile } = this.props
		const { info } = this.state
		const userInfo = profile
		if (profile) {
			const {
				last_name,
				first_name,
				middle_name,
				email,
				phone_number,
				post,
				position,
				role,
				tags,
				date_of_birth,
				department,
				created_at,
				_id,
				image,
				online,
				last_visit,
				// created_tasks,
				// tasks
			} = profile
			return (
				<div className="content content-profile">
					<div className="container-fluid">
						<div className="btn-bottom">
							<Link
								to={{
									pathname: '/users/edit/' + _id,
									state: { user: userInfo }
								}}
								className="edit-btn"
							/>
							<button
								onClick={() => this.logout()}
								className="exit-btn"
							/>
						</div>
						<div className="row">
							<div className="col-4">
								<div className="profile-item">
									<div className="profile-item__photo">
										<img
											src={REACT_APP_SERVER + image}
											id="img-preview"
											alt="img"
										/>
									</div>
									{last_name ? (
										<div className="profile-item__name">
											<span>{last_name}</span>
											<br />
											{`${first_name} ${middle_name}`}
										</div>
									) : (
										<div className="profile-item__name">
											<span>{phone_number}</span>
										</div>
									)}

									<div className="profile-item__status">
										{online ? 'Online' : 'Offline'}
									</div>
								</div>
							</div>
							<div className="col-4">
								<div className="profile-item">
									<div className="sub-title">
										Личные данные
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Email
										</div>
										<div className="profile-item__list-value">
											{email}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Телефон
										</div>
										<div className="profile-item__list-value">
											{phone_number}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Дата рождения
										</div>
										<div className="profile-item__list-value">
											{date_of_birth
												? moment(date_of_birth).format(
													'LL'
												)
												: '-'}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Подраздление
										</div>
										<div className="profile-item__list-value">
											{department ? department.name : '-'}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Должность
										</div>
										<div className="profile-item__list-value">
											{post}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Позиция
										</div>
										<div className="profile-item__list-value">
											{position ? position.name : '-'}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Роль
										</div>
										<div className="profile-item__list-value">
											{role ? role.name : '-'}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Теги
										</div>
										<div className="profile-item__list-value">
											{tags.length > 0
												? tags.map((t, id) => (
													<span
														key={id}
														className="tag"
													>
														{t?.name}
													</span>
												))
												: '-'}
										</div>
									</div>
								</div>
							</div>
							<div className="col-4">
								<div className="profile-item">
									<div className="sub-title">Статистика</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Дата создания
										</div>
										<div className="profile-item__list-value">
											{moment(created_at).format('LL')}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Последняя активность
										</div>
										<div className="profile-item__list-value">
											{last_visit
												? moment(last_visit).format(
													'LL'
												)
												: '-'}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Суммарное время
										</div>
										<div className="profile-item__list-value">
											12:25
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Среднее время
										</div>
										<div className="profile-item__list-value">
											2:27
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Колличство групп
										</div>
										<div className="profile-item__list-value">
											{info ? info.groupsCount : 0}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Количество сообщений
										</div>
										<div className="profile-item__list-value">
											{info ? info.messageCount : 0}
										</div>
									</div>
									{/* <div className="profile-item__list">
										<div className="profile-item__list-title">
											Заданий поставлено
										</div>
										<div className="profile-item__list-value">
											{created_tasks?.length}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Заданий получено
										</div>
										<div className="profile-item__list-value">
											{tasks?.length}
										</div>
									</div>
									<div className="profile-item__list">
										<div className="profile-item__list-title">
											Устройство
										</div>
										<div className="profile-item__list-value">
											Iphone XS
										</div>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return null
		}
	}
}

const mapStateToProps = state => ({
	profile: state.profile.data
})
const mapDispatchToProps = dispatch => ({
	loadUserInfo: payload => {
		dispatch(t_load_user_info(payload))
	},
	setAuth: payload => {
		dispatch(a_setAuth(payload))
	},
	loadProfile: () => {
		dispatch(t_load_profile())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile)
